import React, { useState, useEffect } from "react";
import { Trash2, Users, Search, RefreshCw, Mail, Phone, Calendar } from "lucide-react";
import { toast } from "sonner";
import api from "../../services/api";

const ContactAdmin = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await api.get("/contacts");
            setContacts(response.data);
        } catch (error) {
            toast.error("Lỗi khi tải danh sách liên hệ");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) return;
        try {
            await api.delete(`/contacts/${id}`);
            toast.success("Đã xóa liên hệ");
            fetchContacts();
        } catch (error) {
            toast.error("Lỗi khi xóa liên hệ");
        }
    };

    const filteredContacts = contacts.filter((c) =>
        c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone?.includes(searchTerm) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status) => {
        switch (status) {
            case "new":
                return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Mới</span>;
            case "contacted":
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Đã liên hệ</span>;
            case "done":
                return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Hoàn tất</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status || "Khác"}</span>;
        }
    };

    const getRequestType = (type) => {
        switch (type) {
            case "contact":
                return "Liên hệ";
            case "partner_consultation":
                return "Tư vấn đối tác";
            default:
                return type;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Khách hàng liên hệ</h2>
                        <p className="text-sm text-gray-500">Quản lý thông tin liên hệ từ website</p>
                    </div>
                </div>

                <div className="flex gap-2 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Tìm tên, số điện thoại..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={fetchContacts}
                        className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
                        title="Làm mới"
                    >
                        <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                            <th className="p-4 font-medium">Khách hàng</th>
                            <th className="p-4 font-medium">Liên lạc</th>
                            <th className="p-4 font-medium">Dịch vụ quan tâm</th>
                            <th className="p-4 font-medium">Nội dung</th>
                            <th className="p-4 font-medium">Trạng thái</th>
                            <th className="p-4 font-medium text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">Đang tải dữ liệu...</td>
                            </tr>
                        ) : filteredContacts.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">Không tìm thấy liên hệ nào.</td>
                            </tr>
                        ) : (
                            filteredContacts.map((contact) => (
                                <tr key={contact._id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{contact.fullName}</div>
                                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                            <Calendar size={12} />
                                            {new Date(contact.createdAt).toLocaleDateString('vi-VN')}
                                        </div>
                                    </td>
                                    <td className="p-4 space-y-1">
                                        {contact.phone && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone size={14} className="text-gray-400" />
                                                <a href={`tel:${contact.phone}`} className="hover:text-blue-600">{contact.phone}</a>
                                            </div>
                                        )}
                                        {contact.email && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail size={14} className="text-gray-400" />
                                                <a href={`mailto:${contact.email}`} className="hover:text-blue-600">{contact.email}</a>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="text-gray-900">{contact.service || "Chưa xác định"}</div>
                                        <div className="text-xs text-gray-500 mt-1">{getRequestType(contact.requestType)}</div>
                                    </td>
                                    <td className="p-4 max-w-xs">
                                        <p className="text-gray-600 line-clamp-3 text-sm" title={contact.message}>
                                            {contact.message}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        {getStatusBadge(contact.status)}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(contact._id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Xóa liên hệ"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactAdmin;
