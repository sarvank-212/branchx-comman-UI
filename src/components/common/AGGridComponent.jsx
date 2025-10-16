// src/components/common/AGGridComponent.jsx
import React, { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../styles/global.css";
import "../../styles/AGGridComponent.css";
import AdminService from "../../api/admin/adminService";
import { getAllColumns } from "../../config/columnSchemas";

/* small icons */
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor"/>
    <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M9 3v1H4v2h16V4h-5V3H9z" fill="currentColor"/>
    <path d="M6 8l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14H6z" fill="currentColor"/>
  </svg>
);

const IconButton = ({ title, onClick, className, children }) => (
  <button type="button" title={title} aria-label={title} onClick={onClick} className={`ag-action-btn ${className || ""}`}>
    {children}
  </button>
);

const ActionButtons = ({ data }) => {
  const handleEdit = (e) => { e.stopPropagation(); window.editRecord && window.editRecord(data.id); };
  const handleDelete = (e) => { e.stopPropagation(); window.deleteRecord && window.deleteRecord(data.id); };
  return (
    <div className="actions-wrapper" role="group" aria-label={`Actions for ${data?.id || ''}`}>
      <IconButton title="Edit" onClick={handleEdit} className="edit"><EditIcon/></IconButton>
      <IconButton title="Delete" onClick={handleDelete} className="delete"><TrashIcon/></IconButton>
    </div>
  );
};

const StatusBadge = ({ value }) => {
  if (!value) return <span className="cell-badge badge-inactive">N/A</span>;
  const v = value.toString().toUpperCase();
  return <span className={`cell-badge ${v === "ACTIVE" ? "badge-active" : "badge-inactive"}`}>{v}</span>;
};

const maskSensitive = (rows = []) => rows.map(r => {
  const c = { ...r };
  if ('password' in c) c.password = '••••••';
  if ('passwordHash' in c) c.passwordHash = '••••••';
  return c;
});

/* format date helper */
const formatDate = (val) => {
  if (!val) return '-';
  try {
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return '-';
    // Example format: 2025-10-15 13:45
    const options = { year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit' };
    return d.toLocaleString(undefined, options).replace(',', '');
  } catch {
    return '-';
  }
};

function AGGridComponent({ data = [], selectedModule = null, currentPage = 1, totalPages = 1 }) {
  const gridRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const safeData = useMemo(() => maskSensitive(Array.isArray(data) ? data : []), [data]);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return safeData;
    const q = debouncedSearch.toLowerCase();
    return safeData.filter(r => Object.values(r).some(v => (v||'').toString().toLowerCase().includes(q)));
  }, [safeData, debouncedSearch]);

  // default col def: no floating filters (we removed them earlier)
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    floatingFilter: false,
    resizable: true,
    minWidth: 80,
    cellStyle: { textAlign: 'center' }
  }), []);

  // Build columnDefs and add formatters for date columns, hide ID
  const columnDefs = useMemo(() => {
    if (!safeData || safeData.length === 0) {
      try { return getAllColumns(selectedModule) || []; } catch { return []; }
    }

    const first = safeData[0];
    // Filter out ID field and any sensitive/internal fields
    const keys = Object.keys(first).filter(k =>
      !['id','ID','password','passwordHash','created_at','updated_at','createdAt','updatedAt','created_at_raw'].includes(k)
    );

    const cols = keys.map(k => {
      // Pretty header label: convert snake_case & camelCase to Title Case
      const header = k
        .replace(/_/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, ch => ch.toUpperCase());

      const col = {
        field: k,
        headerName: header,
        minWidth: Math.max(100, Math.floor((header.length + 4) * 10)), // initial min width based on header
        // do NOT set flex here -- we'll autoSize columns to content after render
        cellClass: 'grid-cell-centered',
      };

      // If this column is a created/updated raw key elsewhere, don't show - we will add formatted columns below
      return col;
    });

    // If underlying data has createdAt or created_at, add formatted columns (use original field name if exists)
    const addDateColumnIfExists = (rawNames, headerName) => {
      for (const raw of rawNames) {
        if (raw in first) {
          cols.push({
            field: raw,
            headerName,
            minWidth: 160,
            valueFormatter: (params) => formatDate(params.value),
            cellClass: 'grid-cell-centered',
          });
          return;
        }
      }
    };

    addDateColumnIfExists(['created_at','createdAt'], 'Created At');
    addDateColumnIfExists(['updated_at','updatedAt'], 'Updated At');

    // Actions column (right-most)
    cols.push({
      headerName: 'Actions',
      field: 'actions',
      minWidth: 120,
      maxWidth: 140,
      sortable: false,
      filter: false,
      resizable: false,
      suppressMovable: true,
      cellRenderer: (params) => <ActionButtons data={params.data} />,
      cellClass: 'actions-cell',
      headerClass: 'centered-header',
    });

    return cols;
  }, [safeData, selectedModule]);

  // Auto-size columns to fit content (uses columnApi.autoSizeColumns)
  const autoSizeAllColumns = useCallback(() => {
    const api = gridRef.current?.api;
    const columnApi = gridRef.current?.columnApi;
    if (!api || !columnApi) return;
    // get all columns currently visible
    const allColumns = columnApi.getAllColumns();
    if (!allColumns || allColumns.length === 0) return;
    const colIds = allColumns.map(c => c.getColId());
    try {
      // auto size all columns (based on header + cell content)
      columnApi.autoSizeColumns(colIds, false);
      // ensure grid doesn't overflow horizontally; if total width < viewport, expand last column
      const gridWidth = api.getCenterContainerWidth ? api.getCenterContainerWidth() : api.getSizeColumnsToFit;
      // no further adjustments here — autoSize gives content-based widths
    } catch (e) {
      // ignore sizing errors
    }
  }, []);

  // Call autoSize after data changes and after grid ready
  useEffect(() => {
    if (!gridRef.current) return;
    // run after a short delay to ensure DOM rendered
    const t = setTimeout(() => autoSizeAllColumns(), 120);
    return () => clearTimeout(t);
  }, [filtered, autoSizeAllColumns]);

  const onGridReady = useCallback((params) => {
    // initial autosize
    setTimeout(() => autoSizeAllColumns(), 140);
    // re-autosize on window resize (debounced)
    let rId = null;
    const onResize = () => {
      if (rId) clearTimeout(rId);
      rId = setTimeout(() => autoSizeAllColumns(), 200);
    };
    window.addEventListener('resize', onResize);
    // cleanup listener on destroy
    params.api.addEventListener('destroy', () => {
      window.removeEventListener('resize', onResize);
      if (rId) clearTimeout(rId);
    });
  }, [autoSizeAllColumns]);

  return (
    <div className="ag-grid-container ag-grid-tall">
      <div className="grid-top-row">
        <div className="grid-left">
          <h2 className="page-title">{selectedModule ? `${selectedModule.charAt(0).toUpperCase()}${selectedModule.slice(1)}` : 'Users'} Data</h2>
          <div className="search-container-inline">
            <div className="search-icon">🔍</div>
            <input className="search-input input" placeholder="Search records..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            {searchTerm && <button className="clear-search" onClick={() => setSearchTerm('')}>✕</button>}
          </div>
        </div>

        <div className="grid-right">
          <div className="grid-info text-muted">Total Records: {filtered.length} | Page {currentPage} of {totalPages}</div>
          <div className="grid-actions-right">
            <button className="btn btn-ghost btn-sm" onClick={() => window.importData && window.importData(selectedModule)}>📥 Import</button>
            <button className="btn btn-primary btn-sm" onClick={() => window.exportData && window.exportData(selectedModule, filtered)}>📤 Export</button>
            <button className="btn btn-primary btn-sm" onClick={() => window.openAddModal && window.openAddModal()}>➕ Add</button>
          </div>
        </div>
      </div>

      <div className="scrollable-grid-section">
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            ref={gridRef}
            rowData={filtered}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowHeight={45}
            headerHeight={48}
            onGridReady={onGridReady}
            animateRows
            suppressRowClickSelection
            enableBrowserTooltips
          />
        </div>
      </div>
    </div>
  );
}

export default AGGridComponent;
