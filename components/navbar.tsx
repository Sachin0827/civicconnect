'use client'

import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, Plus, LogOut, Settings, List } from 'lucide-react'
import { mockUser } from '@/lib/mock-data'

interface NavbarProps {
  currentView: 'feed' | 'map'
  onViewChange: (view: 'feed' | 'map') => void
  onReportClick: () => void
}

export function Navbar({ currentView, onViewChange, onReportClick }: NavbarProps) {
  const session = { user: mockUser } // Mock session for demo

  const handleSignOut = () => {
    alert('This is a demo - sign out functionality disabled')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-3 sm:px-4 py-3 animate-fade-in sticky top-0 z-50 backdrop-blur-md bg-white/95">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <h1 className="text-lg sm:text-xl font-bold text-blue-600">CivicConnect</h1>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant={currentView === 'feed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewChange('feed')}
              className="btn-animate"
            >
              <List className="w-4 h-4 mr-1" />
              Feed
            </Button>
            <Button
              variant={currentView === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewChange('map')}
              className="btn-animate"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Map
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <Button 
            onClick={onReportClick} 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 btn-animate h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base touch-manipulation"
          >
            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Report</span>
            <span className="sm:hidden">+</span>
          </Button>

          {session?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full touch-manipulation">
                  <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                    <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                    <AvatarFallback className="text-sm">{session.user.name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-2" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-3">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user.name && (
                      <p className="font-medium text-sm">{session.user.name}</p>
                    )}
                    {session.user.email && (
                      <p className="w-[200px] truncate text-xs text-muted-foreground">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="border-t">
                  <DropdownMenuItem onClick={() => alert('Admin panel - Demo only')} className="py-3">
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Panel (Demo)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="py-3">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile view toggle */}
      <div className="md:hidden flex items-center justify-center space-x-3 mt-4 pb-1">
        <Button
          variant={currentView === 'feed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('feed')}
          className="flex-1 h-11 btn-animate touch-manipulation"
        >
          <List className="w-4 h-4 mr-2" />
          Feed
        </Button>
        <Button
          variant={currentView === 'map' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('map')}
          className="flex-1 h-11 btn-animate touch-manipulation"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Map
        </Button>
      </div>
    </nav>
  )
}
