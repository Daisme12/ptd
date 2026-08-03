import React, { useState, useEffect,useRef } from "react";
import { getCategories } from "../services/categoryService";

import { Link, useLocation } from "react-router-dom";
import { Phone, ChevronDown, Menu, X, LoaderCircle, ShieldCheck } from "lucide-react";
import logo from "../assets/imgs/Logo1.png";

import '../assets/styles/Header.css'


const Header = ({ solid = false }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const menuRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated') === 'true';
    setIsAdmin(authStatus);
  }, [location]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}, []);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
  let lastScrollY = window.scrollY;
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setScrolled(currentScrollY > 50);

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setMenuOpen(false);
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
    const selectedCategory = new URLSearchParams(
      location.search
    ).get("category");

    const headerClasses =
  solid || scrolled
    ? "bg-white text-black shadow-lg"
    : "lg:bg-transparent bg-white text-black lg:text-white";


  return (
    <div
    ref={menuRef}
    className={`
      fixed top-0 left-0 w-full z-50 group
      transition-all duration-300 hover:bg-white
      ${showHeader ? "translate-y-0" : "-translate-y-full"}
      ${headerClasses}
    `}>
      <div className="container-app lg:transition-colors duration-100">
        <div className="flex items-center justify-between w-full">
          <div>
            <Link to="/">
              <img loading="lazy" src={logo}
                alt="logo"
                className="h-14 overflow-hidden w-auto cursor-pointer"
              />
            </Link>
          </div>

          <nav
            className={`
              absolute top-full left-0 w-full
              lg:static lg:w-auto lg:shadow-none
              lg:flex lg:flex-row lg:items-center lg:gap-10

              ${menuOpen ? "flex" : "hidden"}
              lg:flex
              flex-col gap-0 p-5 lg:p-0
              bg-white lg:bg-transparent

              ${
                solid || scrolled
                  ? "text-black"
                  : "text-black lg:text-white lg:group-hover:text-black"
              }
            `}
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`hover:text-primary hover:underline w-full py-3 border-b border-gray-100 lg:w-auto lg:py-0 lg:border-none text-[17px] lg:text-base transition-all
                ${isActive("/")
                  ? "font-bold text-primary "
                  : "font-medium text-gray-800 lg:text-inherit"
                }`}
            >
              Trang Chủ
            </Link>

            <div
              className="dropdown-wrapper w-full lg:w-auto"
              onMouseEnter={() => window.innerWidth >= 1024 && setDropdownOpen(true)}
              onMouseLeave={() => window.innerWidth >= 1024 && setDropdownOpen(false)}
            >
              <Link
                to="/products"
                onClick={(e) => {
                  if (window.innerWidth < 1024) {
                    e.preventDefault();
                    setDropdownOpen(!dropdownOpen);
                  } else {
                    setDropdownOpen(false);
                  }
                }}
                className={`flex items-center justify-between lg:justify-start gap-1 hover:text-primary hover:underline w-full py-3 border-b border-gray-100 lg:w-auto lg:py-0 lg:border-none text-[17px] lg:text-base transition-all ${isActive("/products")
                    ? "font-bold text-primary"
                    : "font-medium text-gray-800 lg:text-inherit"
                  }`}
              >
                <span>Sản Phẩm</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </Link>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  {/* Option for all products on mobile */}
                  <Link
                    to="/products"
                    className="dropdown-item lg:hidden hover:bg-red-100 text-gray-700 font-semibold"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Tất cả sản phẩm
                  </Link>
                  {categories.map((item) => (
                    <Link
                      key={item._id}
                      to={`/products?category=${item.slug}`}
                      className={`dropdown-item 
                        ${
                        selectedCategory === item.slug
                          ? "bg-red-300 text-white"
                          : "hover:bg-red-100 text-gray-700" 
                      }`}
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/certificate"
              onClick={() => setMenuOpen(false)}
              className={`hover:text-primary hover:underline w-full py-3 border-b border-gray-100 lg:w-auto lg:py-0 lg:border-none text-[17px] lg:text-base transition-all
                ${isActive("/certificate")
                  ? "font-bold text-primary"
                  : "font-medium text-gray-800 lg:text-inherit"
                }`}
            >
              Chứng chỉ
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={`hover:text-primary hover:underline w-full py-3 border-b border-gray-100 lg:w-auto lg:py-0 lg:border-none text-[17px] lg:text-base transition-all
                ${isActive("/about")
                  ? "font-bold text-primary"
                  : "font-medium text-gray-800 lg:text-inherit"
                }`}
            >
              Về Chúng Tôi
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={`hover:text-primary hover:underline w-full py-3 border-b border-gray-100 lg:w-auto lg:py-0 lg:border-none text-[17px] lg:text-base transition-all
                ${isActive("/contact")
                  ? "font-bold text-primary"
                  : "font-medium text-gray-800 lg:text-inherit"
                }`}
            >
              Liên Hệ
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="hover:text-red-600 hover:underline w-full py-3 border-b border-gray-100 lg:w-auto lg:py-0 lg:border-none text-[17px] lg:text-base transition-all font-bold text-red-600 lg:text-red-600 flex items-center gap-2"
              >
                <ShieldCheck size={18} />
                Quản Trị
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="btn btn-primary px-3.5 py-2 text-white flex items-center gap-2 hover:bg-primary-dark transition-colors duration-300"
                >
                  <ShieldCheck size={16} />
                  <span>VÀO ADMIN</span>
                </Link>
              ) : (
                <Link
                  to="/contact"
                  className="btn btn-primary px-3.5 py-2 text-white flex items-center gap-2 hover:bg-primary-dark transition-colors duration-300"
                >
                  <Phone size={16} />
                  <span>TƯ VẤN NGAY</span>
                </Link>
              )}
            </div>

            <button
              className="lg:hidden text-primary"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
