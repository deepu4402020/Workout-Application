'use client';

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactElement,
  type SyntheticEvent,
} from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dumbbell,
  X,
  Menu,
  ChevronDown,
  LogOut,
  Settings,
  Camera,
  Upload,
  UserCircle,
  ScanLine,
} from 'lucide-react';

interface NavLink {
  path: string;
  name: string;
  icon: string;
  isNew?: boolean;
}

const navLinks: NavLink[] = [
  { path: '/', name: 'Home', icon: 'home' },
  { path: '/exercises', name: 'Exercises', icon: 'dumbbell' },
  { path: '/diet-plans', name: 'Diet Plans', icon: 'utensils' },
  { path: '/find-gyms', name: 'Find Gyms', icon: 'map-pin' },
  { path: '/pricing', name: 'Pricing', icon: 'dollar-sign' },
];

type ProfilePictureUpdateDetail = { picture: string };
type ProfilePictureUpdateEvent = CustomEvent<ProfilePictureUpdateDetail>;

const DEFAULT_PROFILE_IMAGE =
  'https://i.pinimg.com/474x/a3/cc/fd/a3ccfd7885e6cff94ebbbe40fd9e1611.jpg';

function canUseLocalStorage(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function safeGetItem(key: string): string | null {
  if (!canUseLocalStorage()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (!canUseLocalStorage()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore (private mode / quota / disabled)
  }
}

function safeRemoveItem(key: string): void {
  if (!canUseLocalStorage()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

const NavBar = (): ReactElement => {
  const router = useRouter();
  const pathname = usePathname();

  const [profileImage, setProfileImage] = useState<string>(
    DEFAULT_PROFILE_IMAGE
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('User');
  const [userEmail, setUserEmail] = useState<string>('user@example.com');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Initialize from localStorage (client-side only)
    const savedName = safeGetItem('userName');
    const savedEmail = safeGetItem('userEmail');
    const savedPicture = safeGetItem('profilePicture');
    if (savedName) setUserName(savedName);
    if (savedEmail) setUserEmail(savedEmail);
    if (savedPicture) setProfileImage(savedPicture);
  }, []);

  useEffect(() => {
    const handleStorageChange = (): void => {
      const savedPicture = safeGetItem('profilePicture');
      if (savedPicture) setProfileImage(savedPicture);
      setUserName(safeGetItem('userName') || 'User');
      setUserEmail(safeGetItem('userEmail') || 'user@example.com');
    };

    const handleProfileUpdate = (e: Event): void => {
      const customEvent = e as ProfilePictureUpdateEvent;
      const nextPicture = customEvent.detail?.picture;
      if (typeof nextPicture === 'string' && nextPicture.length > 0) {
        setProfileImage(nextPicture);
      }
    };

    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: globalThis.MouseEvent): void => {
      const targetNode = event.target instanceof Node ? event.target : null;
      if (dropdownRef.current && targetNode && !dropdownRef.current.contains(targetNode)) {
        setProfileDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profilePictureUpdate', handleProfileUpdate);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profilePictureUpdate', handleProfileUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  const handleLogOut = (): void => {
    safeRemoveItem('token');
    safeRemoveItem('userName');
    safeRemoveItem('userEmail');
    safeRemoveItem('profilePicture');
    router.push('/login');
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputEl = e.currentTarget;
    const file = inputEl.files?.[0];
    if (!file) {
      inputEl.value = '';
      return;
    }

    try {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }

      const previewUrl = URL.createObjectURL(file);
      objectUrlRef.current = previewUrl;
      setProfileImage(previewUrl);

      const reader = new FileReader();
      reader.onload = (): void => {
        const result = reader.result;
        if (typeof result === 'string') {
          setProfileImage(result);
          safeSetItem('profilePicture', result);
          window.dispatchEvent(
            new CustomEvent<ProfilePictureUpdateDetail>('profilePictureUpdate', {
              detail: { picture: result },
            })
          );
        }

        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = null;
        }
      };
      reader.onerror = (): void => {
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = null;
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error handling image:', error);
    } finally {
      // Reset so the same file can be selected again
      inputEl.value = '';
    }
  };

  const triggerFileInput = (): void => {
    fileInputRef.current?.click();
  };

  const isActive = (path: string): boolean => pathname === path;

  const handleProfileImageError = (
    e: SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    const img = e.currentTarget;
    if (img.src !== DEFAULT_PROFILE_IMAGE) {
      img.src = DEFAULT_PROFILE_IMAGE;
    }
    setProfileImage(DEFAULT_PROFILE_IMAGE);
    safeRemoveItem('profilePicture');
  };

  return (
    <nav
      role="navigation"
      className={`fixed top-0  left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Dumbbell className="h-7 w-7 text-purple-600" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Eleweight
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-base font-medium px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                  isActive(link.path)
                    ? 'text-purple-600 bg-white shadow-sm'
                    : scrolled
                    ? 'text-gray-700 hover:text-purple-500 hover:bg-white/80'
                    : 'text-gray-800 hover:text-purple-500 hover:bg-white/80'
                }`}
              >
                {link.name}
                {link.isNew && (
                  <span className="ml-1 text-[10px] font-bold bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right side: Camera + Profile */}
          <div className="hidden md:flex items-center gap-2">
            {/* Food Analysis Camera Icon */}
            <Link
              href="/food-analysis"
              title="Analyze Food"
              aria-label="Analyze food"
              className={`relative p-2 rounded-full transition-all ${
                isActive('/food-analysis')
                  ? 'text-white bg-gradient-to-r from-purple-600 to-purple-500 shadow-md'
                  : 'text-gray-700 hover:text-purple-500 hover:bg-gray-100'
              }`}
            >
              <ScanLine className="h-5 w-5" />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={(): void => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex gap-2 items-center p-1.5 rounded-full transition-colors group hover:bg-gray-50/80"
                aria-label="Open profile menu"
                aria-expanded={profileDropdownOpen}
              >
                <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-purple-100 group-hover:ring-purple-300 transition-all">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    onError={handleProfileImageError}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">{userName}</span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    profileDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50"
                  >
                    {/* Profile Header */}
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-white border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="relative group/avatar">
                          <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-purple-200">
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="h-full w-full object-cover"
                              onError={handleProfileImageError}
                            />
                          </div>
                          <button
                            onClick={triggerFileInput}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity"
                            aria-label="Change profile picture"
                          >
                            <Camera className="h-4 w-4 text-white" />
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{userName}</p>
                          <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <button
                        onClick={triggerFileInput}
                        className="flex gap-3 items-center px-3 py-2 w-full text-sm text-left text-gray-700 rounded-lg transition-colors hover:bg-gray-50"
                        aria-label="Upload new profile picture"
                      >
                        <Upload className="h-4 w-4 text-gray-500" />
                        Update Profile Picture
                      </button>
                      <Link
                        href="/settings"
                        onClick={(): void => setProfileDropdownOpen(false)}
                        className="flex gap-3 items-center px-3 py-2 w-full text-sm text-left text-gray-700 rounded-lg transition-colors hover:bg-gray-50"
                      >
                        <Settings className="h-4 w-4 text-gray-500" />
                        Settings
                      </Link>
                      <Link
                        href="/profile"
                        onClick={(): void => setProfileDropdownOpen(false)}
                        className="flex gap-3 items-center px-3 py-2 w-full text-sm text-left text-gray-700 rounded-lg transition-colors hover:bg-gray-50"
                      >
                        <UserCircle className="h-4 w-4 text-gray-500" />
                        View Profile
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleLogOut}
                        className="flex gap-3 items-center px-3 py-2 w-full text-sm text-left text-red-600 rounded-lg transition-colors hover:bg-red-50"
                        aria-label="Log out"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/food-analysis"
              title="Analyze Food"
              aria-label="Analyze food"
              className={`relative p-2 rounded-full transition-all ${
                isActive('/food-analysis')
                  ? 'text-white bg-gradient-to-r from-purple-600 to-purple-500 shadow-md'
                  : 'text-gray-700 hover:text-purple-500 hover:bg-gray-100'
              }`}
            >
              <ScanLine className="h-5 w-5" />
            </Link>

            <button
              onClick={(): void => setIsOpen(!isOpen)}
              className="p-2 rounded-full backdrop-blur-sm transition-colors bg-gray-50/80 hover:bg-gray-100"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={(): void => setIsOpen(false)}
                  className={`px-4 py-3 my-1 rounded-lg text-base font-medium transition-all flex items-center justify-between ${
                    isActive(link.path)
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                  {link.isNew && (
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                </Link>
              ))}

              {/* Profile section in mobile menu */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-2 mb-2">
                  <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-purple-100">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                      onError={handleProfileImageError}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{userName}</p>
                    <p className="text-xs text-gray-500">{userEmail}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogOut();
                    setIsOpen(false);
                  }}
                  className="flex gap-2 items-center px-3 py-2 w-full text-sm text-left text-red-600 rounded-md transition-colors hover:bg-red-50"
                  aria-label="Log out"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
    </nav>
  );
};

export default NavBar;