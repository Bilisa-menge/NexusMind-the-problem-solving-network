import React, { useState, useEffect } from 'react';

interface Feedback {
  id: string;
  category: string;
  subject: string;
  message: string;
  userEmail: string;
  userId: string;
  attachments: Array<{
    filename: string;
    originalName: string;
    path: string;
    size: number;
  }>;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboard: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    status: '',
    category: ''
  });
  const [pagination, setPagination] = useState({
    limit: 20,
    offset: 0,
    total: 0,
    hasMore: true
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'bug-report', label: 'Bug Report' },
    { value: 'feature-request', label: 'Feature Request' },
    { value: 'improvement', label: 'Improvement' },
    { value: 'general', label: 'General Feedback' }
  ];

  const statuses = [
    { value: '', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'read', label: 'Read' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const fetchFeedback = async (reset = false) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);
      if (filter.category) params.append('category', filter.category);
      params.append('limit', pagination.limit.toString());
      params.append('offset', reset ? '0' : pagination.offset.toString());

      const response = await fetch(`http://localhost:3001/api/feedback?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          setError('Admin access required');
          return;
        }
        throw new Error('Failed to fetch feedback');
      }

      const data = await response.json();
      
      if (reset) {
        setFeedback(data.feedback);
        setPagination({
          ...pagination,
          offset: 0,
          total: data.pagination.total,
          hasMore: data.pagination.hasMore
        });
      } else {
        setFeedback([...feedback, ...data.feedback]);
        setPagination({
          ...pagination,
          total: data.pagination.total,
          hasMore: data.pagination.hasMore
        });
      }
      
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback(true);
  }, [filter]);

  const updateFeedbackStatus = async (feedbackId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/feedback/${feedbackId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      setFeedback(feedback.map(item => 
        item.id === feedbackId 
          ? { ...item, status: newStatus, updatedAt: new Date().toISOString() }
          : item
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const loadMore = () => {
    setPagination({
      ...pagination,
      offset: pagination.offset + pagination.limit
    });
    fetchFeedback();
  };

  if (loading && feedback.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading feedback...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback Dashboard</h1>
          <p className="text-gray-600">Manage and respond to user feedback</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Filter
              </label>
              <select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Filter
              </label>
              <select
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {feedback.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-gray-500">No feedback found</div>
            </div>
          ) : (
            feedback.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.subject}
                    </h3>
                    <div className="text-sm text-gray-500">
                      From: {item.userEmail || 'Anonymous'} • {formatDate(item.createdAt)}
                    </div>
                  </div>
                  
                  {/* Status Update */}
                  <div className="flex items-center space-x-2">
                    <select
                      value={item.status}
                      onChange={(e) => updateFeedbackStatus(item.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {item.message}
                  </div>
                </div>

                {/* Attachments */}
                {item.attachments && item.attachments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h4>
                    <div className="space-y-2">
                      {item.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                          <span className="text-sm text-gray-700 truncate flex-1">
                            {attachment.originalName} ({formatFileSize(attachment.size)})
                          </span>
                          <button
                            onClick={() => window.open(`http://localhost:3001/uploads/feedback/${attachment.filename}`, '_blank')}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="text-xs text-gray-500 pt-4 border-t border-gray-100">
                  ID: {item.id} • Updated: {formatDate(item.updatedAt)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {pagination.hasMore && !loading && (
          <div className="mt-6 text-center">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {/* Loading More */}
        {loading && feedback.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            Loading more feedback...
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
