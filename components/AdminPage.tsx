import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, Eye, Trash2, Bug, Lightbulb, LogOut, ChevronLeft, Search, Filter, RefreshCw, Download, Calendar, User } from 'lucide-react';

interface Submission {
  id: string;
  type: 'bug' | 'idea';
  title: string;
  description: string;
  contact?: string;
  createdAt: string;
}

export const AdminPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname === '/admin';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'bug' | 'idea'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'admin-token') {
      setIsAuthenticated(true);
      fetchSubmissions();
    }
  }, []);

  useEffect(() => {
    let filtered = [...submissions];

    if (filterType !== 'all') {
      filtered = filtered.filter(s => s.type === filterType);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.contact?.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredSubmissions(filtered);
  }, [submissions, searchQuery, filterType, sortOrder]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const API_URL = (import.meta.env?.VITE_API_URL || '').replace(/\/api$/, '') || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/admin/submissions`, {
        headers: { Authorization: 'Bearer admin-token' },
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch {
      setError('Không thể kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const API_URL = (import.meta.env?.VITE_API_URL || '').replace(/\/api$/, '') || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        localStorage.setItem('admin-token', 'admin-token');
        setIsAuthenticated(true);
        fetchSubmissions();
      } else {
        setError('Mật khẩu không đúng');
      }
    } catch {
      setError('Lỗi kết nối');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setIsAuthenticated(false);
    setPassword('');
    navigate('/');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) return;

    try {
      const API_URL = (import.meta.env?.VITE_API_URL || '').replace(/\/api$/, '') || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/admin/submissions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer admin-token' },
      });

      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null);
        }
      }
    } catch {
      setError('Lỗi khi xóa');
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Loại', 'Tiêu đề', 'Chi tiết', 'Liên hệ', 'Ngày tạo'].join(','),
      ...filteredSubmissions.map(s => [
        s.id,
        s.type,
        `"${s.title.replace(/"/g, '""')}"`,
        `"${s.description.replace(/"/g, '""')}"`,
        s.contact || '',
        new Date(s.createdAt).toISOString(),
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `feedback-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStats = () => {
    const bugs = submissions.filter(s => s.type === 'bug').length;
    const ideas = submissions.filter(s => s.type === 'idea').length;
    const withContact = submissions.filter(s => s.contact).length;
    return { bugs, ideas, withContact, total: submissions.length };
  };

  const stats = getStats();

  if (!isAdminRoute) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                <Lock size={32} className="text-white/50" />
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              <p className="text-gray-500 mt-2">Nhập mật khẩu để truy cập</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-center text-lg"
                autoFocus
              />

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-sm text-red-400 text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Đăng nhập
              </button>
            </form>

            <button
              onClick={() => navigate('/')}
              className="w-full mt-4 py-3 bg-white/5 text-gray-400 font-medium rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft size={18} />
              <span>Quay lại trang chủ</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303]">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Quản lý phản hồi</h1>
              <p className="text-gray-500 text-sm">{filteredSubmissions.length} phản hồi</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchSubmissions}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              <span>Làm mới</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <LogOut size={18} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg">
                <Bug size={20} className="text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.bugs}</p>
                <p className="text-xs text-gray-500">Báo lỗi</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg">
                <Lightbulb size={20} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.ideas}</p>
                <p className="text-xs text-gray-500">Đề xuất</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg">
                <User size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.withContact}</p>
                <p className="text-xs text-gray-500">Có liên hệ</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg">
                <Calendar size={20} className="text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-xs text-gray-500">Tổng cộng</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'bug' | 'idea')}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30 transition-all"
              >
                <option value="all">Tất cả</option>
                <option value="bug">Báo lỗi</option>
                <option value="idea">Đề xuất</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30 transition-all"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
              </select>
            </div>
            <button
              onClick={handleExport}
              disabled={filteredSubmissions.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <Download size={16} />
              <span>Xuất CSV</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {loading ? (
              <div className="text-center py-12 text-gray-500">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
                <p>Đang tải...</p>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-[#0A0A0A] rounded-2xl border border-white/5">
                <Eye size={48} className="mx-auto mb-4 opacity-30" />
                <p>Không tìm thấy phản hồi nào</p>
              </div>
            ) : (
              filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`p-4 bg-[#0A0A0A] rounded-xl border cursor-pointer transition-all ${
                    selectedSubmission?.id === submission.id
                      ? 'border-white/30 bg-white/[0.05]'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      submission.type === 'bug' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                    }`}>
                      {submission.type === 'bug' ? (
                        <Bug size={20} className="text-red-400" />
                      ) : (
                        <Lightbulb size={20} className="text-yellow-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">{submission.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{submission.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-xs text-gray-600">
                          {new Date(submission.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                        {submission.contact && (
                          <p className="text-xs text-gray-600 flex items-center gap-1">
                            <User size={10} />
                            {submission.contact}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(submission.id);
                      }}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-1">
            {selectedSubmission ? (
              <div className="sticky top-6 bg-[#0A0A0A] rounded-2xl border border-white/10 p-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  selectedSubmission.type === 'bug' 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {selectedSubmission.type === 'bug' ? <Bug size={14} /> : <Lightbulb size={14} />}
                  {selectedSubmission.type === 'bug' ? 'Báo lỗi' : 'Đề xuất ý tưởng'}
                </div>

                <h2 className="text-xl font-bold text-white">{selectedSubmission.title}</h2>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      <Filter size={12} />
                      Chi tiết
                    </label>
                    <p className="mt-1 text-gray-300 whitespace-pre-wrap">{selectedSubmission.description}</p>
                  </div>

                  {selectedSubmission.contact && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <User size={12} />
                        Liên hệ
                      </label>
                      <p className="mt-1 text-gray-400">{selectedSubmission.contact}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={12} />
                      Ngày gửi
                    </label>
                    <p className="mt-1 text-gray-400">
                      {new Date(selectedSubmission.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-gray-600 font-mono">ID: {selectedSubmission.id}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sticky top-6 bg-[#0A0A0A] rounded-2xl border border-white/5 p-6 text-center text-gray-500">
                <Eye size={48} className="mx-auto mb-4 opacity-30" />
                <p>Chọn một phản hồi để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
