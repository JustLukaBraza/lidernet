
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (type: 'login' | 'register') => {
    setLoading(true)
    try {
      if (type === 'login') {
        await signIn(email, password)
        toast({
          title: "წარმატებით შეხვედით!",
          description: "თქვენ წარმატებით შეხვედით LiderNet-ში.",
        })
      } else {
        await signUp(email, password)
        toast({
          title: "რეგისტრაცია წარმატებულია!",
          description: "გთხოვთ შეამოწმოთ თქვენი ელ.ფოსტა დასადასტურებლად.",
        })
      }
      onClose()
      setEmail('')
      setPassword('')
    } catch (error: any) {
      toast({
        title: "შეცდომა",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white text-center">LiderNet-ში შესვლა</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="login" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600">
              შესვლა
            </TabsTrigger>
            <TabsTrigger value="register" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600">
              რეგისტრაცია
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">ელ.ფოსტა</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">პაროლი</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="••••••••"
              />
            </div>
            <Button 
              onClick={() => handleSubmit('login')} 
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {loading ? 'შესვლა...' : 'შესვლა'}
            </Button>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-gray-300">ელ.ფოსტა</Label>
              <Input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password" className="text-gray-300">პაროლი</Label>
              <Input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="••••••••"
              />
            </div>
            <Button 
              onClick={() => handleSubmit('register')} 
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {loading ? 'რეგისტრაცია...' : 'რეგისტრაცია'}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
