import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SteamSalesPredictor() {
  const [gameName, setGameName] = useState('')
  const [followers, setFollowers] = useState('')
  const [positiveRating, setPositiveRating] = useState('')
  const [firstWeek, setFirstWeek] = useState(0)
  const [firstMonth, setFirstMonth] = useState(0)
  const [firstYear, setFirstYear] = useState(0)

  const calculateSales = (e: React.FormEvent) => {
    e.preventDefault()
    const followersNum = parseInt(followers)
    const ratingNum = parseFloat(positiveRating) / 100

    if (isNaN(followersNum) || isNaN(ratingNum)) {
      alert('请输入有效的数字')
      return
    }

    const firstWeekSales = Math.round(followersNum * 3 * Math.pow(ratingNum, 2))
    setFirstWeek(firstWeekSales)
    setFirstMonth(firstWeekSales * 2)
    setFirstYear(firstWeekSales * 5)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Steam销量预测器</h1>
      <form onSubmit={calculateSales} className="space-y-4">
        <div>
          <Label htmlFor="gameName">游戏名称</Label>
          <Input
            id="gameName"
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="输入游戏名称"
            required
          />
        </div>
        <div>
          <Label htmlFor="followers">发售前关注数</Label>
          <Input
            id="followers"
            type="number"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
            placeholder="输入发售前关注数"
            required
          />
        </div>
        <div>
          <Label htmlFor="positiveRating">预估好评率 (%)</Label>
          <Input
            id="positiveRating"
            type="number"
            value={positiveRating}
            onChange={(e) => setPositiveRating(e.target.value)}
            placeholder="输入预估好评率（0-100）"
            required
            min="0"
            max="100"
          />
        </div>
        <Button type="submit" className="w-full">计算预估销量</Button>
      </form>
      {firstWeek > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-semibold mb-2">预估销量结果：</h2>
          <p>首周销量：{firstWeek.toLocaleString()}</p>
          <p>首月销量：{firstMonth.toLocaleString()}</p>
          <p>首年销量：{firstYear.toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}