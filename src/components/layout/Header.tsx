
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Search,
  User,
  Bell,
  Menu,
  X
} from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="border-b border-border sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-auction-blue">
            BidHub
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
            Categories
          </Link>
          <Link to="/auctions" className="text-foreground hover:text-primary transition-colors">
            All Auctions
          </Link>
          <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
            How It Works
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex items-center max-w-md w-full mx-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search auctions..."
              className="pl-9 w-full"
            />
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>My Bids</DropdownMenuItem>
                  <DropdownMenuItem>Watching</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsAuthenticated(false)}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsAuthenticated(true)}>
                Sign In
              </Button>
              <Button>Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 border-t border-border">
          <div className="my-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search auctions..."
                className="pl-9 w-full"
              />
            </div>
          </div>
          <nav className="flex flex-col space-y-4">
            <Link
              to="/categories"
              className="text-foreground hover:text-primary transition-colors py-2 px-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/auctions"
              className="text-foreground hover:text-primary transition-colors py-2 px-1"
              onClick={() => setIsMenuOpen(false)}
            >
              All Auctions
            </Link>
            <Link
              to="/how-it-works"
              className="text-foreground hover:text-primary transition-colors py-2 px-1"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="pt-2">
              {isAuthenticated ? (
                <>
                  <div className="flex justify-between items-center py-2 px-1">
                    <span>My Account</span>
                    <User className="h-5 w-5" />
                  </div>
                  <Link
                    to="/profile"
                    className="block py-2 px-1 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/bids"
                    className="block py-2 px-1 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bids
                  </Link>
                  <Link
                    to="/watching"
                    className="block py-2 px-1 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Watching
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-1 py-2 h-auto hover:bg-transparent hover:text-destructive"
                    onClick={() => {
                      setIsAuthenticated(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    onClick={() => {
                      setIsAuthenticated(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button variant="outline">Sign Up</Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
