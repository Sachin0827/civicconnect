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
    <nav className="bg-white border-b border-gray-200 px-4 py-3 animate-fade-in">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-blue-600">CivicConnect</h1>
          
          <div className="hidden sm:flex items-center space-x-2">
            <Button
              variant={currentView === 'feed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewChange('feed')}
            >
              <List className="w-4 h-4 mr-1" />
              Feed
            </Button>
            <Button
              variant={currentView === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewChange('map')}
            >
              <MapPin className="w-4 h-4 mr-1" />
              Map
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button onClick={onReportClick} size="sm" className="bg-green-600 hover:bg-green-700 btn-animate">
            <Plus className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Report Issue</span>
            <span className="sm:hidden">Report</span>
          </Button>

          {session?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                    <AvatarFallback>{session.user.name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user.name && (
                      <p className="font-medium">{session.user.name}</p>
                    )}
                    {session.user.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="border-t">
                  <DropdownMenuItem onClick={() => alert('Admin panel - Demo only')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Panel (Demo)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
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
      <div className="sm:hidden flex items-center justify-center space-x-2 mt-3">
        <Button
          variant={currentView === 'feed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('feed')}
          className="flex-1"
        >
          <List className="w-4 h-4 mr-1" />
          Feed
        </Button>
        <Button
          variant={currentView === 'map' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('map')}
          className="flex-1"
        >
          <MapPin className="w-4 h-4 mr-1" />
          Map
        </Button>
      </div>
    </nav>
  )
}
