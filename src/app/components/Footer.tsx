import { Activity } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-blue-600" />
              <span className="font-black text-lg bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
                VBCAI.org
              </span>
            </div>
            <p className="text-sm text-blue-900/70">
              Empowering healthcare organizations with data-driven insights for
              better value-based care delivery.
            </p>
            <div className="flex space-x-4">
              {["twitter", "linkedin", "facebook"].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-blue-900 mb-4">Solutions</h3>
            <ul className="space-y-3">
              {[
                "Population Health",
                "Care Management",
                "Risk Analytics",
                "Quality Metrics",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-blue-900/70 hover:text-blue-900"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-blue-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                "Blog",
                "Case Studies",
                "Webinars",
                "Research Papers",
                "Documentation",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-blue-900/70 hover:text-blue-900"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-blue-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Careers",
                "Contact",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-blue-900/70 hover:text-blue-900"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-blue-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-blue-900/70">
              © {new Date().getFullYear()} VBC.ai. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-blue-900/70 hover:text-blue-900"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-blue-900/70 hover:text-blue-900"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-blue-900/70 hover:text-blue-900"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
