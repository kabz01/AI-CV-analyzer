"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { testSupabaseConnection, trackButtonClick, syncOfflineData } from "@/lib/supabase"

export default function TestConnection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<any>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [offlineData, setOfflineData] = useState<{
    clicks: number
    quotes: number
    contacts: number
  }>({ clicks: 0, quotes: 0, contacts: 0 })

  // Check online status
  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Check for offline data
  useEffect(() => {
    const checkOfflineData = () => {
      try {
        const clicks = JSON.parse(localStorage.getItem("offline_button_clicks") || "[]").length
        const quotes = JSON.parse(localStorage.getItem("offline_quote_submissions") || "[]").length
        const contacts = JSON.parse(localStorage.getItem("offline_contact_submissions") || "[]").length

        setOfflineData({ clicks, quotes, contacts })
      } catch (e) {
        console.error("Error checking offline data:", e)
      }
    }

    checkOfflineData()

    // Set up interval to check periodically
    const interval = setInterval(checkOfflineData, 5000)
    return () => clearInterval(interval)
  }, [])

  const testConnection = async () => {
    setStatus("loading")
    try {
      // Track this button click (which tests write operations)
      await trackButtonClick("Test Supabase Connection")

      // Test the connection (which tests read operations)
      const connectionResult = await testSupabaseConnection()

      setResult(connectionResult)
      setStatus(connectionResult.success ? "success" : "error")
    } catch (error) {
      console.error("Connection test failed:", error)
      setResult(error)
      setStatus("error")
    }
  }

  const handleSyncOfflineData = async () => {
    setStatus("loading")
    try {
      const syncResult = await syncOfflineData()
      setResult(syncResult)
      setStatus(syncResult.success ? "success" : "error")

      // Refresh offline data counts
      setOfflineData({ clicks: 0, quotes: 0, contacts: 0 })
    } catch (error) {
      console.error("Sync failed:", error)
      setResult(error)
      setStatus("error")
    }
  }

  const totalOfflineItems = offlineData.clicks + offlineData.quotes + offlineData.contacts

  return (
    <div className="container py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`p-2 rounded-md ${isOnline ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
          >
            Network Status: {isOnline ? "Online" : "Offline"}
          </div>

          <p>Click the button below to test your Supabase connection.</p>

          <Button onClick={testConnection} disabled={status === "loading"} className="w-full">
            {status === "loading" ? "Testing..." : "Test Connection"}
          </Button>

          {status === "success" && (
            <div className="p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-md">
              ✅ Connection successful! Your Supabase integration is working properly.
            </div>
          )}

          {status === "error" && (
            <div className="p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 rounded-md">
              ❌ Connection failed. Please check your API keys and network connection.
              <pre className="mt-2 text-xs overflow-auto max-h-40">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          {totalOfflineItems > 0 && (
            <div className="p-3 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded-md">
              ⚠️ You have offline data waiting to be synced:
              <ul className="list-disc pl-5 mt-2">
                {offlineData.clicks > 0 && <li>{offlineData.clicks} button clicks</li>}
                {offlineData.quotes > 0 && <li>{offlineData.quotes} quote submissions</li>}
                {offlineData.contacts > 0 && <li>{offlineData.contacts} contact form submissions</li>}
              </ul>
              <Button
                onClick={handleSyncOfflineData}
                disabled={!isOnline || status === "loading"}
                className="w-full mt-2 bg-yellow-600 hover:bg-yellow-700"
              >
                Sync Offline Data
              </Button>
            </div>
          )}

          <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Missing"}</p>
            <p>API Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Missing"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
