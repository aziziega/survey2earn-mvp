"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Trash2,
  GripVertical,
  Type,
  CheckSquare,
  Circle,
  Star,
  FileSlidersIcon as Slider,
  Calendar,
  FileText,
  Coins,
  Users,
  Clock,
} from "lucide-react"

interface Question {
  id: string
  type: "text" | "multiple-choice" | "single-choice" | "rating" | "scale" | "date"
  title: string
  description?: string
  required: boolean
  options?: string[]
  min?: number
  max?: number
}

interface Survey {
  title: string
  description: string
  category: string
  estimatedTime: string
  rewardAmount: number
  maxParticipants: number
  questions: Question[]
}

const questionTypes = [
  { type: "text", label: "Text Input", icon: Type },
  { type: "multiple-choice", label: "Multiple Choice", icon: CheckSquare },
  { type: "single-choice", label: "Single Choice", icon: Circle },
  { type: "rating", label: "Rating", icon: Star },
  { type: "scale", label: "Scale", icon: Slider },
  { type: "date", label: "Date", icon: Calendar },
]

export function SurveyBuilder() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("basic")
  const [survey, setSurvey] = useState<Survey>({
    title: "",
    description: "",
    category: "",
    estimatedTime: "",
    rewardAmount: 0,
    maxParticipants: 100,
    questions: [],
  })

  const addQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      title: "",
      required: false,
      ...(type === "multiple-choice" || type === "single-choice" ? { options: [""] } : {}),
      ...(type === "rating" ? { min: 1, max: 5 } : {}),
      ...(type === "scale" ? { min: 1, max: 10 } : {}),
    }
    setSurvey((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
    }))
  }

  const deleteQuestion = (id: string) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }))
  }

  const addOption = (questionId: string) => {
    updateQuestion(questionId, {
      options: [...(survey.questions.find((q) => q.id === questionId)?.options || []), ""],
    })
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = survey.questions.find((q) => q.id === questionId)
    if (question?.options) {
      const newOptions = [...question.options]
      newOptions[optionIndex] = value
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = survey.questions.find((q) => q.id === questionId)
    if (question?.options && question.options.length > 1) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex)
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const handlePublish = () => {
    if (!survey.title || !survey.description || survey.questions.length === 0) {
      toast({
        title: "Incomplete Survey",
        description: "Please fill in all required fields and add at least one question.",
        variant: "destructive",
      })
      return
    }

    // Mock publish logic
    toast({
      title: "Survey Published!",
      description: "Your survey has been published and is now live.",
    })
  }

  const estimatedCost = survey.rewardAmount * survey.maxParticipants

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Create Survey</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Survey Information</CardTitle>
                    <CardDescription>Basic details about your survey</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Survey Title</Label>
                      <Input
                        id="title"
                        value={survey.title}
                        onChange={(e) => setSurvey((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter survey title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={survey.description}
                        onChange={(e) => setSurvey((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe what your survey is about"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={survey.category}
                          onValueChange={(value) => setSurvey((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="defi">DeFi</SelectItem>
                            <SelectItem value="nft">NFT</SelectItem>
                            <SelectItem value="gaming">Gaming</SelectItem>
                            <SelectItem value="dao">DAO</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="time">Estimated Time</Label>
                        <Select
                          value={survey.estimatedTime}
                          onValueChange={(value) => setSurvey((prev) => ({ ...prev, estimatedTime: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-3 min">1-3 minutes</SelectItem>
                            <SelectItem value="3-5 min">3-5 minutes</SelectItem>
                            <SelectItem value="5-10 min">5-10 minutes</SelectItem>
                            <SelectItem value="10-15 min">10-15 minutes</SelectItem>
                            <SelectItem value="15+ min">15+ minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="questions" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Survey Questions</h2>
                  <div className="flex gap-2">
                    {questionTypes.map((type) => (
                      <Button
                        key={type.type}
                        variant="outline"
                        size="sm"
                        onClick={() => addQuestion(type.type as Question["type"])}
                        className="flex items-center gap-1"
                      >
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {survey.questions.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No questions yet</h3>
                      <p className="text-gray-500 mb-4">Add your first question using the buttons above</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {survey.questions.map((question, index) => (
                      <Card key={question.id}>
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="w-4 h-4 text-gray-400" />
                              <Badge variant="outline">
                                {questionTypes.find((t) => t.type === question.type)?.label}
                              </Badge>
                              <span className="text-sm text-gray-500">Question {index + 1}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => deleteQuestion(question.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label>Question Title</Label>
                            <Input
                              value={question.title}
                              onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                              placeholder="Enter your question"
                            />
                          </div>

                          {question.description !== undefined && (
                            <div>
                              <Label>Description (Optional)</Label>
                              <Input
                                value={question.description}
                                onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                                placeholder="Additional context for the question"
                              />
                            </div>
                          )}

                          {(question.type === "multiple-choice" || question.type === "single-choice") && (
                            <div>
                              <Label>Options</Label>
                              <div className="space-y-2">
                                {question.options?.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex gap-2">
                                    <Input
                                      value={option}
                                      onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                      placeholder={`Option ${optionIndex + 1}`}
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeOption(question.id, optionIndex)}
                                      disabled={question.options!.length <= 1}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button variant="outline" size="sm" onClick={() => addOption(question.id)}>
                                  <Plus className="w-4 h-4 mr-1" />
                                  Add Option
                                </Button>
                              </div>
                            </div>
                          )}

                          {(question.type === "rating" || question.type === "scale") && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Minimum Value</Label>
                                <Input
                                  type="number"
                                  value={question.min}
                                  onChange={(e) =>
                                    updateQuestion(question.id, { min: Number.parseInt(e.target.value) })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Maximum Value</Label>
                                <Input
                                  type="number"
                                  value={question.max}
                                  onChange={(e) =>
                                    updateQuestion(question.id, { max: Number.parseInt(e.target.value) })
                                  }
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`required-${question.id}`}
                              checked={question.required}
                              onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                            />
                            <Label htmlFor={`required-${question.id}`}>Required question</Label>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reward & Participation Settings</CardTitle>
                    <CardDescription>Configure rewards and participation limits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reward">Reward per Response (S2E)</Label>
                        <Input
                          id="reward"
                          type="number"
                          value={survey.rewardAmount}
                          onChange={(e) =>
                            setSurvey((prev) => ({ ...prev, rewardAmount: Number.parseFloat(e.target.value) || 0 }))
                          }
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <Label htmlFor="participants">Max Participants</Label>
                        <Input
                          id="participants"
                          type="number"
                          value={survey.maxParticipants}
                          onChange={(e) =>
                            setSurvey((prev) => ({ ...prev, maxParticipants: Number.parseInt(e.target.value) || 100 }))
                          }
                          placeholder="100"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">Cost Estimation</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Reward per response:</span>
                          <span>{survey.rewardAmount} S2E</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max participants:</span>
                          <span>{survey.maxParticipants}</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-1">
                          <span>Total cost:</span>
                          <span>{estimatedCost} S2E</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Survey Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4" />
                    <span>{survey.questions.length} questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{survey.estimatedTime || "Not set"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Coins className="w-4 h-4" />
                    <span>{survey.rewardAmount} S2E reward</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>Max {survey.maxParticipants} participants</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Publish Survey</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handlePublish}
                  className="w-full"
                  disabled={!survey.title || !survey.description || survey.questions.length === 0}
                >
                  Publish Survey
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Make sure to fund your survey with {estimatedCost} S2E tokens before publishing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
