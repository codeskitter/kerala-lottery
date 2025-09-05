"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, Save, X, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface CarouselImage {
  id: number
  title?: string
  image_url: string
  alt_text: string
  link_url?: string
  display_order: number
  is_active: boolean
  created_at: string
}

interface FormData {
  title: string
  image_url: string
  alt_text: string
  link_url: string
  display_order: number
  is_active: boolean
}

export default function CarouselManagementPage() {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    image_url: "",
    alt_text: "",
    link_url: "",
    display_order: 0,
    is_active: true,
  })

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/admin/content/carousel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setImages(data)
      } else {
        toast.error("Failed to fetch carousel images")
      }
    } catch (error) {
      console.error("Error fetching images:", error)
      toast.error("Error loading carousel images")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.image_url || !formData.alt_text) {
      toast.error("Image URL and Alt Text are required")
      return
    }

    try {
      const token = localStorage.getItem("adminToken")
      const method = editingId ? "PUT" : "POST"
      const body = editingId ? { ...formData, id: editingId } : formData

      const response = await fetch("/api/admin/content/carousel", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast.success(editingId ? "Image updated successfully" : "Image added successfully")
        resetForm()
        fetchImages()
      } else {
        toast.error("Failed to save image")
      }
    } catch (error) {
      console.error("Error saving image:", error)
      toast.error("Error saving image")
    }
  }

  const handleEdit = (image: CarouselImage) => {
    setFormData({
      title: image.title || "",
      image_url: image.image_url,
      alt_text: image.alt_text,
      link_url: image.link_url || "",
      display_order: image.display_order,
      is_active: image.is_active,
    })
    setEditingId(image.id)
    setShowAddForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`/api/admin/content/carousel?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast.success("Image deleted successfully")
        fetchImages()
      } else {
        toast.error("Failed to delete image")
      }
    } catch (error) {
      console.error("Error deleting image:", error)
      toast.error("Error deleting image")
    }
  }

  const toggleActive = async (image: CarouselImage) => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/admin/content/carousel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...image,
          is_active: !image.is_active,
        }),
      })

      if (response.ok) {
        toast.success(`Image ${!image.is_active ? "activated" : "deactivated"}`)
        fetchImages()
      } else {
        toast.error("Failed to update image status")
      }
    } catch (error) {
      console.error("Error updating image:", error)
      toast.error("Error updating image")
    }
  }

  const updateDisplayOrder = async (image: CarouselImage, direction: "up" | "down") => {
    const newOrder = direction === "up" ? image.display_order - 1 : image.display_order + 1

    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/admin/content/carousel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...image,
          display_order: newOrder,
        }),
      })

      if (response.ok) {
        toast.success("Display order updated")
        fetchImages()
      } else {
        toast.error("Failed to update display order")
      }
    } catch (error) {
      console.error("Error updating display order:", error)
      toast.error("Error updating display order")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      image_url: "",
      alt_text: "",
      link_url: "",
      display_order: 0,
      is_active: true,
    })
    setEditingId(null)
    setShowAddForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading carousel images...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Carousel Management</h1>
          <p className="text-muted-foreground">Manage homepage carousel images and content</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Image
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Image" : "Add New Image"}</CardTitle>
            <CardDescription>
              {editingId ? "Update the carousel image details" : "Add a new image to the carousel"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Carousel slide title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL *</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alt_text">Alt Text *</Label>
                  <Input
                    id="alt_text"
                    value={formData.alt_text}
                    onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                    placeholder="Descriptive text for the image"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link_url">Link URL</Label>
                  <Input
                    id="link_url"
                    value={formData.link_url}
                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                    placeholder="/register, https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number.parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {editingId ? "Update Image" : "Add Image"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Images List */}
      <div className="grid gap-4">
        {images.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">No carousel images found</p>
                <Button onClick={() => setShowAddForm(true)}>Add Your First Image</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          images.map((image) => (
            <Card key={image.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.alt_text}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold truncate">{image.title || image.alt_text}</h3>
                        <p className="text-sm text-muted-foreground truncate">{image.image_url}</p>
                        {image.link_url && <p className="text-sm text-blue-600 mt-1">Link: {image.link_url}</p>}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge variant={image.is_active ? "default" : "secondary"}>
                          {image.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">Order: {image.display_order}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="outline" onClick={() => updateDisplayOrder(image, "up")} title="Move up">
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateDisplayOrder(image, "down")}
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleActive(image)}
                      title={image.is_active ? "Deactivate" : "Activate"}
                    >
                      {image.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(image)} title="Edit">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(image.id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
