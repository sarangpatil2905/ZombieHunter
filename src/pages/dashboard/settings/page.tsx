"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell, Shield, Key, Globe, Mail, Trash2 } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences.
        </p>
      </div>

      {/* Notifications */}
      <Card className="glass border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Notifications</CardTitle>
              <CardDescription>Configure how you receive alerts</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive alerts via email</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-border/50" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">High Severity Alerts</p>
              <p className="text-sm text-muted-foreground">Immediate notification for critical issues</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-border/50" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Digest</p>
              <p className="text-sm text-muted-foreground">Summary of security status</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-border/50" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New API Discovery</p>
              <p className="text-sm text-muted-foreground">Alert when new endpoints are found</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="glass border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neon-green/10">
              <Shield className="w-5 h-5 text-neon-green" />
            </div>
            <div>
              <CardTitle className="text-lg">Security Settings</CardTitle>
              <CardDescription>Manage security preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
          <Separator className="bg-border/50" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Session Timeout</p>
              <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-border/50" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-Quarantine</p>
              <p className="text-sm text-muted-foreground">Automatically quarantine high-risk APIs</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="glass border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neon-cyan/10">
              <Key className="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
              <CardTitle className="text-lg">API Keys</CardTitle>
              <CardDescription>Manage your API access tokens</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="api-key" className="text-sm text-muted-foreground">Production API Key</Label>
              <Input 
                id="api-key"
                type="password" 
                value="sk-prod-xxxxxxxxxxxxxxxxxxxx" 
                readOnly 
                className="font-mono bg-secondary/50 mt-1"
              />
            </div>
            <Button variant="outline" className="mt-6">Regenerate</Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="webhook-key" className="text-sm text-muted-foreground">Webhook Secret</Label>
              <Input 
                id="webhook-key"
                type="password" 
                value="whsec-xxxxxxxxxxxxxxxxxxxx" 
                readOnly 
                className="font-mono bg-secondary/50 mt-1"
              />
            </div>
            <Button variant="outline" className="mt-6">Regenerate</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="glass border-neon-red/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neon-red/10">
              <Trash2 className="w-5 h-5 text-neon-red" />
            </div>
            <div>
              <CardTitle className="text-lg text-neon-red">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-neon-red/20 bg-neon-red/5">
            <div>
              <p className="font-medium">Delete All Data</p>
              <p className="text-sm text-muted-foreground">Permanently remove all API data and configurations</p>
            </div>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
