import React, { useState } from 'react';
import AdminService from '../../api/admin/adminService';

const AddModal = ({ isOpen, onClose, selectedModule, onSuccess, formFields = [] }) => {
  // Initialize form data with empty values for all fields
  const getInitialFormData = () => {
    const initialData = {};
    formFields.forEach(field => {
      initialData[field.field] = '';
    });
    return initialData;
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AdminService.createRecord(selectedModule, formData);
      onSuccess();
      onClose();
      // Reset form
      setFormData(getInitialFormData());
    } catch (error) {
      console.error('Create error:', error);

      // Handle specific error cases
      let errorMessage = 'Failed to create record';

      if (error.message && error.message.includes('Unique constraint failed')) {
        if (error.message.includes('email')) {
          errorMessage = 'A user with this email already exists. Please use a different email address.';
        } else {
          errorMessage = 'A record with this information already exists. Please check your data and try again.';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      // Reset form when closing
      setFormData(getInitialFormData());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New {selectedModule ? selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1) : 'Record'}</h3>
          <button
            className="modal-close-btn"
            onClick={handleClose}
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {formFields.map(field => (
            <div key={field.field} className="form-group">
              <label htmlFor={field.field}>
                {field.headerName} {field.required !== false ? '*' : ''}
              </label>

              {field.type === 'select' || field.options ? (
                <select
                  id={field.field}
                  className="input"
                  value={formData[field.field] || ''}
                  onChange={(e) => handleInputChange(field.field, e.target.value)}
                  required={field.required !== false}
                  disabled={loading}
                >
                  <option value="">{`Select ${field.headerName}`}</option>
                  {(field.options || []).map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.field}
                  type={field.type || 'text'}
                  className="input"
                  value={formData[field.field] || ''}
                  onChange={(e) => handleInputChange(field.field, e.target.value)}
                  required={field.required !== false}
                  disabled={loading}
                  placeholder={`Enter ${field.headerName.toLowerCase()}`}
                />
              )}
            </div>
          ))}

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
