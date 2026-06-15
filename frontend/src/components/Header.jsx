import React, { useState, useEffect,useRef } from "react";
import { getCategories } from "../services/categoryService";

import { Link, useLocation } from "react-router-dom";
import { Phone, ChevronDown, Menu, X,LoaderCircle } from "lucide-react";
import logo from "../assets/imgs/Logo.webp";

import '../assets/styles/Header.css'


const Header = ({ solid = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const menuRef = useRef(null);

  const location = useLocation();

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

  window.addEventListener("scroll", handleScroll);

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
    : "md:bg-transparent bg-white text-black md:text-white";


  return (
    <div
    ref={menuRef}
    className={`
      fixed top-0 left-0 w-full z-50
      transition-all duration-300
      ${showHeader ? "translate-y-0" : "-translate-y-full"}
      ${headerClasses}
    `}>
      <div className="container-app group hover:bg-white 
      md:transition-colors duration-100">
        <div className="flex items-center justify-between w-full">
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="h-14 w-auto cursor-pointer"
              />
            </Link>
          </div>

          <nav
            className={`
              absolute top-full left-0 w-full
              md:static md:w-auto md:shadow-none
              md:flex md:flex-row md:items-center md:gap-10

              ${menuOpen ? "flex" : "hidden"}
              md:flex
              flex-col gap-4 p-4 md:p-0
              bg-white md:bg-transparent

              ${
                solid || scrolled
                  ? "text-black"
                  : "text-black md:text-white md:group-hover:text-black"
              }
            `}
          >
            <Link
              to="/"
              className={`hover:text-primary hover:underline 
                ${isActive("/")
                  ? "font-bold text-primary "
                  : "font-medium"
                }`}
            >
              Trang Chủ
            </Link>

            <div
              className="dropdown-wrapper"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                to="/products"
                className={`flex items-center gap-1 hover:text-primary hover:underline ${isActive("/products")
                    ? "font-bold text-primary"
                    : "font-medium"
                  }`}
              >
                Sản Phẩm
                <ChevronDown size={16} />
              </Link>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  {categories.map((item) => (
                    <Link
                      key={item._id}
                      to={`/products?category=${item.slug}`}
                      className={`dropdown-item 
                        ${
                        selectedCategory === item.slug
                          ? "bg-red-300 text-white"
                          : "hover:bg-red-100 text-gray-700" 
                      }`
                      }                    
                      >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/certificate"
              className={`hover:text-primary hover:underline 
                ${isActive("/certificate")
                  ? "font-bold text-primary"
                  : "font-medium"
                }`}
            >
              Chứng chỉ
            </Link>

            <Link
              to="/about"
              className={`hover:text-primary hover:underline 
                ${isActive("/about")
                  ? "font-bold text-primary"
                  : "font-medium"
                }`}
            >
              Về Chúng Tôi
            </Link>



            <Link
              to="/contact"
              className={`hover:text-primary  hover:underline 
                ${isActive("/contact")
                  ? "font-bold text-primary"
                  : "font-medium"
                }`}
            >
              Liên Hệ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Link
              to="/contact"
                className="btn btn-primary px-3 py-2 text-white flex items-center gap-2 hover:bg-primary-dark transition-colors duration-300"
              >
                <Phone size={16} />
                <span>TƯ VẤN NGAY</span>
              </Link>
            </div>

            <button
              className="md:hidden text-primary"
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
