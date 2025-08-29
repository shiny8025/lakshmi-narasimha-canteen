"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ETASelectModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (eta: number) => void
  currentEta?: number
}

export function ETASelectModal({ isOpen, onClose, onConfirm, currentEta }: ETASelectModalProps) {
  const [selectedEta, setSelectedEta] = useState<string>(currentEta?.toString() || "15")

  const etaOptions = [
    { value: "5", label: "5 minutes" },
    { value: "15", label: "15 minutes" },
    { value: "20", label: "20 minutes" },
    { value: "30", label: "30 minutes" },
  ]

  const handleConfirm = () => {
    onConfirm(Number.parseInt(selectedEta))
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif font-bold">Set Estimated Time</DialogTitle>
          <DialogDescription>Choose the estimated preparation time for this order.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup value={selectedEta} onValueChange={setSelectedEta}>
            {etaOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Set ETA
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
