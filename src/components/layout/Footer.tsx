
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-border mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">BidHub</h3>
            <p className="text-gray-600 text-sm">
              The premier online auction platform for collectors, enthusiasts, and bargain hunters.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Help & Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="text-gray-600 hover:text-auction-blue">Help Center</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-auction-blue">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-auction-blue">Contact Us</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-auction-blue">How It Works</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-gray-600 hover:text-auction-blue">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-auction-blue">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-600 hover:text-auction-blue">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/newsletter" className="text-gray-600 hover:text-auction-blue">Newsletter</Link></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-auction-blue">Twitter</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-auction-blue">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-auction-blue">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} BidHub. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <select className="bg-transparent text-sm text-gray-500 border border-gray-300 rounded py-1 px-2">
              <option>English (US)</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};
