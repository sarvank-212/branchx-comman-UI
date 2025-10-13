import React from "react";
import dollar from "@/assets/icons/dollar.png";
import mapImage from "@/assets/bg/india.svg";
import txn from "@/assets/icons/txn.png";
import wallet from "@/assets/icons/wallet.png";
import wallettick from "@/assets/icons/wallettick.png";
import { Line , Bar} from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  BarElement
);

// Enhanced card styling for professional dashboard
const professionalCardStyles = {
  businessCard: {
    backgroundColor: 'white',
    borderRadius: '12px', // Slightly less rounded for cleaner look
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)', // Softer, more subtle shadow
    border: 'none', // Completely clean design
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    minWidth: '280px',
    display: 'flex',
    alignItems: 'center'
  },
  businessCardHover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.06)'
  },
  cardIcon: {
    backgroundColor: '#2f6ef2', 
    borderRadius: '10px', 
    padding: '12px',
    width: '48px', 
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0
  },
  cardIconCircle: {
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    right: '-4px',
    bottom: '-4px',
    backgroundColor: 'rgba(47, 110, 242, 0.08)',
    borderRadius: '50%',
    zIndex: 0
  },
  cardContent: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
    marginLeft: '16px'
  },
  cardAmount: {
    fontSize: '1.25rem', // 20px equivalent, slightly smaller than before
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '2px',
    lineHeight: '1.3'
  },
  cardLabel: {
    fontSize: '0.875rem', // 14px, reduced for cleaner look
    color: '#64748b',
    fontWeight: '600',
    lineHeight: '1.4',
    marginBottom: '6px'
  },
  cardSubtext: {
    fontSize: '0.75rem', // 12px for subtitle
    color: '#94a3b8',
    fontWeight: '400'
  },
  cardDetails: {
    fontSize: '0.75rem', // 12px for meta details
    color: '#94a3b8',
    fontWeight: '400',
    marginBottom: '2px',
    lineHeight: '1.3'
  }
};

// Dashboard styling
const dashboardStyles = {
  container: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '24px 32px'
  },
  searchSection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '48px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    maxWidth: '800px'
  },
  searchInput: {
    flex: 1,
    padding: '16px 20px',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '16px',
    backgroundColor: '#f8fafc',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    height: '56px'
  },
  searchButton: {
    padding: '16px 32px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    height: '56px',
    whiteSpace: 'nowrap'
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '48px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  },
  threeColumnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px', // Increased gap for better separation
    marginBottom: '32px' // Increased margin for better visual division
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '18px'
  },
  fourColumnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '18px'
  }
};

const DashboardPage = () => {

  // Get the computed color of an element with the "modecolor" class
  //const modeColor = getComputedStyle(document.querySelector(".modecolor")).color;
  const chartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "GTV",
        data: [4545, 10000, 15000, 12000, 17000, 20000, 22000, 21000, 19000, 18000, 16000, 23000],
        borderColor: "#7FC47F",
        backgroundColor: "rgba(127,196,127,0.15)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#7FC47F",
        pointBorderColor: "#7FC47F",
        pointRadius: 5,
        pointHoverRadius: 7,
        order: 1,
      },
      {
        label: "Gross Revenue",
        data: [45454, 50000, 60000, 55000, 70000, 80000, 85000, 90000, 87000, 83000, 79000, 95000],
        borderColor: "#748BC5",
        backgroundColor: "rgba(116,139,197,0.15)",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#748BC5",
        pointBorderColor: "#748BC5",
        pointRadius: 5,
        pointHoverRadius: 7,
        order: 2,
      },
      {
        label: "Net Revenue",
        data: [45454, 60000, 70000, 65000, 80000, 90000, 95000, 100000, 97000, 93000, 89000, 105000],
        borderColor: "#FDB62E",
        backgroundColor: "rgba(253,182,46,0.15)",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#FDB62E",
        pointBorderColor: "#FDB62E",
        pointRadius: 5,
        pointHoverRadius: 7,
        order: 3,
      },
    ],
  };

  const chartDatavs = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Fund Request",
        data: [15230, 98500, 304500, 256000, 110200, 471000, 385600, 76200, 198700, 441000, 329800, 159400],
        borderColor: "#7FC47F",
        backgroundColor: "rgba(127,196,127,0.15)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#7FC47F",
        pointBorderColor: "#7FC47F",
        pointRadius: 5,
        pointHoverRadius: 7,
        order: 1,
      },
      {
        label: "Transactions",
        data: [24300, 118900, 495000, 172400, 38500, 287100, 314800, 44000, 267900, 349200, 130000, 498700],
        borderColor: "#748BC5",
        backgroundColor: "rgba(116,139,197,0.15)",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#748BC5",
        pointBorderColor: "#748BC5",
        pointRadius: 5,
        pointHoverRadius: 7,
        order: 2,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#232B3E",
          font: { size: 14, weight: "bold" },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#232B3E", font: { weight: "bold" } },
      },
      y: {
        grid: { color: "#E3E8F3", borderDash: [4, 4] },
        ticks: { color: "#232B3E", font: { weight: "bold" } },
      },
    },
  };

  const txnBarData = {
    labels: [
      "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
      "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
    ],
    datasets: [
      {
        label: "Amount",
        data: [4545545, 6545545, 8545545, 10545545, 6545545, 5545545, 1000000, 6545545, 8545545, 7545545],
        backgroundColor: "#7FC47F",
        titleColor: "FF0000",
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
        borderSkipped: false,
      }
    ]
  };

  const txnBarOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (ctx) => ctx[0].label,
          label: (ctx) => [
            `Count: 422`,
            `Amount: ₹${ctx.formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          ]
        },
        backgroundColor: "#fff",
        titleColor: "#232B3E",
        bodyColor: "#232B3E",
        borderColor: "#E3E8F3",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        bodyFont: { weight: "bold" }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#232B3E", font: { weight: "bold" } }
      },
      y: {
        grid: { color: "#E3E8F3", borderDash: [4, 4] },
        ticks: { color: "#232B3E", font: { weight: "bold" } }
      }
    }
  };

  const stakeholderData = [
    { label: "Enterprise", value: "1,23,344", active: "1,23,344" },
    { label: "White Label", value: "1,23,344", active: "1,23,344" },
    { label: "Finlet", value: "1,000", active: "1,000" },
    { label: "Master Distributors", value: "200", active: "1,000" },
    { label: "Distributors", value: "300", active: "1,000" },
    { label: "Retailers", value: "500", active: "1,000" },
  ];

  return (
    <div style={dashboardStyles.container}>
      {/* Add responsive styles for better mobile experience */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .business-summary-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
          }
        }
        @media (max-width: 768px) {
          .business-summary-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .business-summary-grid {
            gap: 20px !important;
          }
        }
      `}</style>

      {/* Dashboard Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1e293b',
          margin: '0',
          letterSpacing: '0.5px'
        }}>
          DASHBOARD
        </h1>
      </div>

      {/* Search Box Section - Above Business Summary */}
      <div style={dashboardStyles.searchSection}>
        <div style={dashboardStyles.searchBar}>
          <input
            type="text"
            placeholder="Search dashboard..."
            style={dashboardStyles.searchInput}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
          <button style={dashboardStyles.searchButton}>
            Search
          </button>
        </div>
      </div>

      {/* Main Dashboard Content - Business Summary */}
      <div style={{ marginBottom: '32px' }}>
        {/* Business Summary Section */}
        <div style={dashboardStyles.sectionCard}>
          {/* Section Header */}
          <div style={{ backgroundColor: '#202939', borderRadius: '12px 12px 0 0', padding: '16px 24px', margin: '-32px -32px 32px -32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: 0 }}>Business Summary</h2>
            <button style={{ backgroundColor: 'transparent', border: '1px solid rgba(255, 255, 255, 0.3)', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Download <span style={{ fontSize: '16px' }}>↓</span>
            </button>
          </div>

          {/* Top Row Cards - GTV, Gross Revenue, Net Revenue */}
          <div className="business-summary-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            marginBottom: '32px'
          }}>
            {/* GTV Card */}
            <div style={professionalCardStyles.businessCard}>
              <div style={professionalCardStyles.cardIcon}>
                <img src={txn} alt="GTV" style={{ width: '24px', height: '24px', filter: 'brightness(0) invert(1)' }} />
              </div>
              <div style={professionalCardStyles.cardContent}>
                <div style={professionalCardStyles.cardAmount}>
                  ₹1,23,344
                </div>
                <div style={professionalCardStyles.cardSubtext}>(TNX-123)</div>
                <div style={professionalCardStyles.cardLabel}>GTV</div>
              </div>
            </div>

            {/* Gross Revenue Card */}
            <div style={professionalCardStyles.businessCard}>
              <div style={professionalCardStyles.cardIcon}>
                <img src={wallettick} alt="Gross Revenue" style={{ width: '24px', height: '24px', filter: 'brightness(0) invert(1)' }} />
              </div>
              <div style={professionalCardStyles.cardContent}>
                <div style={professionalCardStyles.cardAmount}>₹1,23,344</div>
                <div style={professionalCardStyles.cardLabel}>Gross Revenue <span style={{ fontWeight: 'bold' }}>(1212)</span></div>
              </div>
            </div>

            {/* Net Revenue Card */}
            <div style={professionalCardStyles.businessCard}>
              <div style={professionalCardStyles.cardIcon}>
                <img src={dollar} alt="Net Revenue" style={{ width: '24px', height: '24px', filter: 'brightness(0) invert(1)' }} />
              </div>
              <div style={professionalCardStyles.cardContent}>
                <div style={professionalCardStyles.cardAmount}>₹1,23,344</div>
                <div style={professionalCardStyles.cardLabel}>Net Revenue</div>
              </div>
            </div>
          </div>

          {/* Bottom Row Cards - Enterprise, White Label, Finlet */}
          <div className="business-summary-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {/* Enterprise Card */}
            <div style={professionalCardStyles.businessCard}>
              <div style={professionalCardStyles.cardIcon}>
                <img src={wallettick} alt="Enterprise" style={{ width: '24px', height: '24px', filter: 'brightness(0) invert(1)' }} />
              </div>
              <div style={professionalCardStyles.cardContent}>
                <div style={{ ...professionalCardStyles.cardAmount, fontSize: '1.125rem', marginBottom: '8px' }}>Enterprise</div>
                <div style={{ ...professionalCardStyles.cardDetails, marginBottom: '3px' }}>GTV – 1,23,23,454</div>
                <div style={{ ...professionalCardStyles.cardDetails, marginBottom: '3px' }}>Txn Count – 1,23,234</div>
                <div style={{ ...professionalCardStyles.cardDetails, marginBottom: '3px' }}>G.R. – 1,234</div>
                <div style={professionalCardStyles.cardDetails}>N.R – 123</div>
              </div>
            </div>

            {/* White Label Card */}
            <div style={professionalCardStyles.businessCard}>
              <div style={professionalCardStyles.cardIcon}>
                <img src={wallettick} alt="White Label" style={{ width: '24px', height: '24px', filter: 'brightness(0) invert(1)' }} />
              </div>
              <div style={professionalCardStyles.cardContent}>
                <div style={{ ...professionalCardStyles.cardAmount, fontSize: '1.125rem', marginBottom: '8px' }}>White Label</div>
                <div style={{ ...professionalCardStyles.cardDetails, marginBottom: '3px' }}>Txn Count – 1,23,234</div>
                <div style={{ ...professionalCardStyles.cardDetails, marginBottom: '3px' }}>GTV – 1,23,23,454</div>
                <div style={{ ...professionalCardStyles.cardDetails, marginBottom: '3px' }}>G.R. – 1,234</div>
                <div style={professionalCardStyles.cardDetails}>N.R – 123</div>
              </div>
            </div>

            {/* Finlet Card */}
            <div style={professionalCardStyles.businessCard}>
              <div style={professionalCardStyles.cardIcon}>
                <img src={wallettick} alt="Finlet" style={{ width: '24px', height: '24px', filter: 'brightness(0) invert(1)' }} />
              </div>
              <div style={professionalCardStyles.cardContent}>
                <div style={{ ...professionalCardStyles.cardAmount, fontSize: '1.125rem', marginBottom: '8px' }}>Finlet</div>
                <div style={{ ...professionalCardStyles.cardDetails, marginBottom: '3px' }}>Txn Count – 1,23,234</div>
                <div style={{ ...professionalCardStyles.cardDetails, marginBottom: '3px' }}>GTV – 1,23,23,454</div>
                <div style={{ ...professionalCardStyles.cardDetails, marginBottom: '3px' }}>G.R. – 1,234</div>
                <div style={professionalCardStyles.cardDetails}>N.R – 123</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the Dashboard Content */}
      <div style={dashboardStyles.sectionCard}>
        {/* Chart Header */}
        <div style={{ backgroundColor: '#202939', borderRadius: '12px 12px 0 0', padding: '16px 24px', margin: '-32px -32px 24px -32px' }}>
          <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: 0 }}>GTV Vs Gross Revenue Vs Net Revenue</h3>
        </div>

        {/* Chart Total */}
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px', textAlign: 'center' }}>₹ 454,545,452</div>

        {/* Chart Container */}
        <div style={{ height: '300px', width: '100%', padding: '0 16px' }}>
          <Line
            data={chartData}
            options={{
              ...chartOptions,
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  ...chartOptions.plugins.legend,
                  labels: {
                    ...chartOptions.plugins.legend.labels,
                    boxWidth: 20
                  }
                }
              },
              scales: {
                x: {
                  ...chartOptions.scales.x,
                  grid: { display: false },
                  ticks: {
                    ...chartOptions.scales.x.ticks,
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0
                  }
                },
                y: {
                  ...chartOptions.scales.y,
                  grid: {
                    color: '#E3E8F3',
                    borderDash: [4, 4],
                    drawTicks: false
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Visual Separator */}
      <div style={{ height: '24px' }}></div>

      {/* Transactions Analysis */}
      <div style={dashboardStyles.sectionCard}>
        {/* Section Header with Controls */}
        <div style={{ backgroundColor: '#202939', borderRadius: '12px 12px 0 0', padding: '16px 24px', margin: '-32px -32px 24px -32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: 0 }}>Transactions Analysis</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              color: '#64748b',
              outline: 'none'
            }}>
              <option>Status</option>
            </select>
            <select style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              color: '#64748b',
              outline: 'none'
            }}>
              <option>Services</option>
            </select>
            <button style={{
              backgroundColor: '#e2e8f0',
              color: '#64748b',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Payout
            </button>
            <button style={{
              backgroundColor: '#445E94',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Recharge
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div style={{ height: '400px', width: '100%', padding: '0 16px 24px 16px' }}>
          <Bar
            data={txnBarData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    title: (ctx) => ctx[0].label,
                    label: (ctx) => [
                      `Count: 422`,
                      `Amount: ₹${ctx.formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    ]
                  },
                  backgroundColor: "#fff",
                  titleColor: "#232B3E",
                  bodyColor: "#232B3E",
                  borderColor: "#E3E8F3",
                  borderWidth: 1,
                  padding: 12,
                  displayColors: false,
                  bodyFont: { weight: "bold" }
                }
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: {
                    color: "#232B3E",
                    font: { weight: "bold" },
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0
                  }
                },
                y: {
                  grid: {
                    color: "#E3E8F3",
                    borderDash: [4, 4],
                    drawTicks: false
                  },
                  ticks: {
                    color: "#232B3E",
                    font: { weight: "bold" },
                    callback: function (value) {
                      return '₹' + value.toLocaleString();
                    }
                  }
                }
              },
              barPercentage: 0.8,
              categoryPercentage: 0.9
            }}
          />
        </div>
      </div>

      {/* Reconciliation */}
      <div className="mb-6">
        <div className="bg-strip-dashboard rounded-t-lg px-6 py-3 flex items-center ">
          <span className="text-white font-semibold">Reconciliation</span>
          <span className="ml-auto text-primary-b-dashboard text-white text-xs cursor-pointer">View Summary &gt;</span>
        </div>
        <div className="bg-bck-dashboard rounded-b-lg shadow px-6 py-8 grid grid-cols-3 gap-0 border-t border-[#F1F2F6]">
          {/* Mismatched */}
          <div className="pr-8 border-r border-[#F1F2F6] flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#EEF4FF] rounded-full p-2 flex items-center justify-center">
                <svg width="24" height="24" fill="#748BC5"><circle cx="12" cy="12" r="10" fill="#EEF4FF" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#748BC5">✂️</text></svg>
              </span>
              <span className="text-[#748BC5] font-bold text-lg">Mismatched</span>
            </div>
            <div className="flex gap-8">
              <div>
                <div className="text-primary-dashboard font-bold text-lg">1,23,344</div>
                <div className="text-xs text-primary-b-dashboard">Number</div>
              </div>
              <div>
                <div className="text-primary-dashboard font-bold text-lg">₹ 23,23,344</div>
                <div className="text-xs text-primary-b-dashboard">Amount</div>
              </div>
            </div>
            <div>
              <div className="bg-text-label-dashboard text-white font-bold text-base mb-1 px-2 py-1 rounded">Recovered</div>
              <div className="flex gap-8">
                <div>
                  <div className="text-primary-dashboard font-bold text-lg">450</div>
                  <div className="text-xs text-primary-b-dashboard">Number</div>
                </div>
                <div>
                  <div className="text-primary-dashboard font-bold text-lg">₹ 1,23,344</div>
                  <div className="text-xs text-primary-b-dashboard">Amount</div>
                </div>
              </div>
            </div>
          </div>
          {/* Double Refund */}
          <div className="px-8 border-r border-[#F1F2F6] flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#EEF4FF] rounded-full p-2 flex items-center justify-center">
                <svg width="24" height="24" fill="#748BC5"><circle cx="12" cy="12" r="10" fill="#EEF4FF" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#748BC5">💲</text></svg>
              </span>
              <span className="text-[#748BC5] font-bold text-lg">Double Refund</span>
            </div>
            <div className="flex gap-8">
              <div>
                <div className="text-primary-dashboard font-bold text-lg">1,23,344</div>
                <div className="text-xs text-primary-b-dashboard">Number</div>
              </div>
              <div>
                <div className="text-primary-dashboard font-bold text-lg">₹ 23,23,344</div>
                <div className="text-xs text-primary-b-dashboard">Amount</div>
              </div>
            </div>
            <div>
              <div className="bg-text-label-dashboard text-white font-bold text-base mb-1 px-2 py-1 rounded">Recovered</div>
              <div className="flex gap-8">
                <div>
                  <div className="text-primary-dashboard font-bold text-lg">450</div>
                  <div className="text-xs text-primary-b-dashboard">Number</div>
                </div>
                <div>
                  <div className="text-primary-dashboard font-bold text-lg">₹ 1,23,344</div>
                  <div className="text-xs text-primary-b-dashboard">Amount</div>
                </div>
              </div>
            </div>
          </div>
          {/* No Refund */}
          <div className="pl-8 flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#EEF4FF] rounded-full p-2 flex items-center justify-center">
                <svg width="24" height="24" fill="#748BC5"><circle cx="12" cy="12" r="10" fill="#EEF4FF" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#748BC5">🚫</text></svg>
              </span>
              <span className="text-[#748BC5] font-bold text-lg">No Refund</span>
            </div>
            <div className="flex gap-8">
              <div>
                <div className="text-primary-dashboard font-bold text-lg">1,23,344</div>
                <div className="text-xs text-primary-b-dashboard">Number</div>
              </div>
              <div>
                <div className="text-primary-dashboard font-bold text-lg">₹ 23,23,344</div>
                <div className="text-xs text-primary-b-dashboard">Amount</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners and Customers Summary */}
      <div className="mb-6">
        <div className="bg-strip-dashboard rounded-t-lg px-6 py-3 flex items-center ">
          <span className="text-white font-semibold">Partners and Customers Summary</span>
          <div className="ml-auto flex items-center gap-2">
            <input type="date" className="bg-[#232B3E] text-white rounded px-2 py-1 text-xs border border-[#E3E8F3]" />
            <span className="text-white text-xs">to</span>
            <input type="date" className="bg-[#232B3E] text-white rounded px-2 py-1 text-xs border border-[#E3E8F3]" />
            <button className="bg-bck-dashboard text-primary-dashboard px-3 py-1 rounded text-xs font-medium ml-2">Show Data</button>
          </div>
        </div>
        <div className="rounded-b-lg shadow px-6 py-8 section-bg-dashboard">
          {/* Top Row: Enterprise & White Label */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Enterprise */}
            <div className="bg-bck-dashboard-b rounded-xl p-6 flex flex-col items-start gap-2 w-full">
              <div className="flex items-center gap-3">
                <span className="bg-[#EEF4FF] rounded-full p-3 text-3xl">👥</span>
                <div>
                  <span className="text-primary-dashboard font-bold text-2xl mr-4">1,23,344</span>
                  <span className="bg-text-label-dashboard text-white font-bold text-2xl px-2 py-1 rounded">1,23,344</span>
                </div>
              </div>
              <div className="flex items-center gap-8 ml-16">
                <span className="text-primary-b-dashboard text-base">Enterprise</span>
                <span className="text-primary-b-dashboard text-base font-bold">Active</span>
              </div>
            </div>
            {/* White Label */}
            <div className="bg-bck-dashboard-b rounded-xl p-6 flex flex-col items-start gap-2 w-full">
              <div className="flex items-center gap-3">
                <span className="bg-[#EEF4FF] rounded-full p-3 text-3xl">👥</span>
                <div>
                  <span className="text-primary-dashboard font-bold text-2xl mr-4">1,23,344</span>
                  <span className="bg-text-label-dashboard text-white font-bold text-2xl px-2 py-1 rounded">1,23,344</span>
                </div>
              </div>
              <div className="flex items-center gap-8 ml-16">
                <span className="text-primary-b-dashboard text-base">White Label</span>
                <span className="text-primary-b-dashboard text-base font-bold">Active</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Master Distributors, Distributors, Retailers */}
          <div className="grid grid-cols-3 gap-6">
            {/* Master Distributors */}
            <div className="bg-bck-dashboard-b rounded-xl p-6 flex flex-col items-start gap-2 w-full">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏠</span>
                <span className="text-primary-dashboard font-bold text-xl mr-4">200</span>
                <span className="bg-text-label-dashboard text-white font-bold text-xl px-2 py-1 rounded">1,000</span>
              </div>
              <div className="flex items-center gap-8 ml-10">
                <span className="text-primary-b-dashboard text-base">Master Distributors</span>
                <span className="text-primary-b-dashboard text-base font-bold">Active</span>
              </div>
            </div>
            {/* Distributors */}
            <div className="bg-bck-dashboard-b rounded-xl p-6 flex flex-col items-start gap-2 w-full">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏠</span>
                <span className="text-primary-dashboard font-bold text-xl mr-4">300</span>
                <span className="bg-text-label-dashboard text-white font-bold text-xl px-2 py-1 rounded">1,000</span>
              </div>
              <div className="flex items-center gap-8 ml-10">
                <span className="text-primary-b-dashboard text-base">Distributors</span>
                <span className="text-primary-b-dashboard text-base font-bold">Active</span>
              </div>
            </div>
            {/* Retailers */}
            <div className="bg-bck-dashboard-b rounded-xl p-6 flex flex-col items-start gap-2 w-full">
              <div className="flex items-center gap-3">
                <span className="text-3xl">👥</span>
                <span className="text-primary-dashboard font-bold text-xl mr-4">500</span>
                <span className="bg-text-label-dashboard text-white font-bold text-xl px-2 py-1 rounded">1,000</span>
              </div>
              <div className="flex items-center gap-8 ml-10">
                <span className="text-primary-b-dashboard text-base">Retailers</span>
                <span className="text-primary-b-dashboard text-base font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fund request and Transaction summary */}
      <div style={dashboardStyles.sectionCard}>
        {/* Section Header */}
        <div style={{ backgroundColor: '#202939', borderRadius: '12px 12px 0 0', padding: '16px 24px', margin: '-32px -32px 32px -32px' }}>
          <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: 0 }}>Fund request and Transaction summary</h3>
        </div>

        {/* Fund Cards Grid */}
        <div style={dashboardStyles.fourColumnGrid}>
          {/* Approved Fund Request */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                backgroundColor: '#EEF4FF',
                borderRadius: '50%',
                padding: '12px',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={txn} alt="Approved Fund Request" style={{ width: '24px', height: '24px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>
                  ₹1,23,344 <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#64748b' }}>(TNX-123)</span>
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Approved Fund Request <span style={{ fontWeight: 'bold' }}>(1212)</span></div>
              </div>
            </div>
          </div>

          {/* GTV Revenue */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                backgroundColor: '#EEF4FF',
                borderRadius: '50%',
                padding: '12px',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={wallettick} alt="GTV Revenue" style={{ width: '24px', height: '24px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>₹1,23,344</div>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>GTV</div>
              </div>
            </div>
          </div>

          {/* Opening Balance */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                backgroundColor: '#EEF4FF',
                borderRadius: '50%',
                padding: '12px',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={dollar} alt="Opening Balance" style={{ width: '24px', height: '24px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>₹1,23,344</div>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Opening Balance</div>
              </div>
            </div>
          </div>

          {/* Wallet Balance */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                backgroundColor: '#EEF4FF',
                borderRadius: '50%',
                padding: '12px',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={dollar} alt="Wallet Balance" style={{ width: '24px', height: '24px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>₹1,23,344</div>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Wallet Balance</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fund request Vs Transaction summary Chart */}
      <div style={dashboardStyles.sectionCard}>
        {/* Chart Header */}
        <div style={{ backgroundColor: '#f0f0f0', borderRadius: '12px 12px 0 0', padding: '16px 24px', margin: '-32px -32px 24px -32px' }}>
          <h3 style={{ color: '#000000', fontSize: '16px', fontWeight: '600', margin: 0 }}>Fund request Vs Transaction summary</h3>
        </div>

        {/* Chart Container */}
        <div style={{ height: '300px', width: '100%', padding: '0 16px' }}>
          <Line
            data={chartDatavs}
            options={{
              ...chartOptions,
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  ...chartOptions.plugins.legend,
                  labels: {
                    ...chartOptions.plugins.legend.labels,
                    boxWidth: 20
                  }
                }
              },
              scales: {
                x: {
                  ...chartOptions.scales.x,
                  grid: { display: false },
                  ticks: {
                    ...chartOptions.scales.x.ticks,
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0
                  }
                },
                y: {
                  ...chartOptions.scales.y,
                  grid: {
                    color: "#748BC5",
                    borderDash: [4, 4],
                    drawTicks: false
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* User Summary */}
      <div style={dashboardStyles.sectionCard}>
        {/* Section Header with Stats */}
        <div style={{ backgroundColor: '#202939', borderRadius: '12px 12px 0 0', padding: '16px 24px', margin: '-32px -32px 24px -32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: 0 }}>User Summary</h2>
            <div style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              ↑ 36.8%
            </div>
            <span style={{ color: '#cbd5e1', fontSize: '14px' }}>vs. Sep 8, 2024 user increased</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select style={{
              backgroundColor: '#334155',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '14px',
              outline: 'none'
            }}>
              <option>INDIA</option>
            </select>
            <select style={{
              backgroundColor: '#334155',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '14px',
              outline: 'none'
            }}>
              <option>Monthly</option>
            </select>
            <button style={{
              backgroundColor: '#334155',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              ⬇ Download
            </button>
          </div>
        </div>

        {/* Map and Stakeholder Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Map */}
          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '16px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img
              src={mapImage}
              alt="India Map"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Stakeholder Info */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #f1f5f9'
          }}>
            <h3 style={{
              backgroundColor: '#202939',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              padding: '12px 16px',
              borderRadius: '8px 8px 0 0',
              margin: '-24px -24px 20px -24px',
              textAlign: 'center'
            }}>
              Stake Holder Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {stakeholderData.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  borderBottom: index < stakeholderData.length - 1 ? '1px solid #e5e7eb' : 'none'
                }}>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b' }}>{item.value}</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>{item.label}</div>
                  </div>
                  <div style={{
                    backgroundColor: '#16a34a',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    padding: '6px 12px',
                    borderRadius: '6px'
                  }}>
                    {item.active} Active
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage
