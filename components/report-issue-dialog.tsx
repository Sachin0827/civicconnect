'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Camera, Upload, X, Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
// Remove Prisma import for demo

interface ReportIssueDialogProps {
  isOpen: boolean
  onClose: () => void
  onIssueCreated: () => void
}

const categories = [
  { value: 'INFRASTRUCTURE', label: 'Infrastructure', icon: '🏗️' },
  { value: 'SAFETY', label: 'Safety', icon: '🛡️' },
  { value: 'ENVIRONMENT', label: 'Environment', icon: '🌱' },
  { value: 'TRANSPORTATION', label: 'Transportation', icon: '🚗' },
  { value: 'PUBLIC_SERVICES', label: 'Public Services', icon: '🏛️' },
  { value: 'COMMUNITY', label: 'Community', icon: '👥' },
  { value: 'OTHER', label: 'Other', icon: '📝' },
]

export function ReportIssueDialog({ isOpen, onClose, onIssueCreated }: ReportIssueDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('OTHER')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [gettingLocation, setGettingLocation] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setCategory('OTHER')
    setImage(null)
    setImagePreview(null)
    setLocation(null)
  }

  const getCurrentLocation = () => {
    setGettingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          // Try to get address from coordinates using reverse geocoding
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
            )
            if (response.ok) {
              const data = await response.json()
              const address = data.results[0]?.formatted
              setLocation({ lat: latitude, lng: longitude, address })
            } else {
              setLocation({ lat: latitude, lng: longitude })
            }
          } catch (error) {
            setLocation({ lat: latitude, lng: longitude })
          }
          setGettingLocation(false)
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Could not get your location. Please enter it manually.",
            variant: "destructive",
          })
          setGettingLocation(false)
        }
      )
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      })
      setGettingLocation(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 5MB.",
          variant: "destructive",
        })
        return
      }
      
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    // For MVP, we'll use a simple base64 approach
    // In production, you'd use a service like UploadThing, Cloudinary, or AWS S3
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !description.trim() || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and get your location.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    
    // Simulate API call delay for demo
    setTimeout(() => {
      toast({
        title: "Issue Reported! (Demo)",
        description: "This is a demo - your issue would be saved in a real app.",
      })

      resetForm()
      onClose()
      onIssueCreated()
      setLoading(false)
    }, 1500)
  }

  useEffect(() => {
    if (isOpen) {
      getCurrentLocation()
    } else {
      resetForm()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-scale-in gpu-accelerated">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-lg">Report an Issue</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief title for the issue"
                maxLength={100}
                required
                className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail"
                maxLength={500}
                rows={3}
                required
              />
            </div>

            <div>
              <Label>Category *</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.value}
                    type="button"
                    variant={category === cat.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategory(cat.value)}
                    className="justify-start"
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Photo (Optional)</Label>
              <div className="mt-2">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImage(null)
                        setImagePreview(null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ''
                        }
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed"
                  >
                    <div className="flex flex-col items-center">
                      <Camera className="h-8 w-8 mb-2" />
                      <span>Take or Upload Photo</span>
                    </div>
                  </Button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <Label>Location *</Label>
              <div className="mt-2">
                {location ? (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Location captured
                        </p>
                        <p className="text-xs text-green-600">
                          {location.address || `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={getCurrentLocation}
                        disabled={gettingLocation}
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                    disabled={gettingLocation}
                    className="w-full"
                  >
                    {gettingLocation ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-2" />
                    )}
                    {gettingLocation ? 'Getting Location...' : 'Get Current Location'}
                  </Button>
                )}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 btn-animate">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1 btn-animate">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Reporting...
                  </>
                ) : (
                  'Report Issue'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
