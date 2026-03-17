"use client";

import { useState, useCallback } from "react";
import { Copy, Database, Send, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Toast } from "@workspace/ui/components/toast";
import {
  HERO_CARDS,
  type HeroCard,
  type HeroCardCategory,
} from "../app/data/hero-cards";

interface HeroCardsPanelProps {
  onChainSelect?: (chainKey: string) => void;
}

const CATEGORIES: { id: HeroCardCategory; label: string }[] = [
  { id: "migration", label: "Asset Hub Migration" },
  { id: "defi", label: "DeFi" },
];

export function HeroCardsPanel({ onChainSelect }: HeroCardsPanelProps) {
  const [activeCategory, setActiveCategory] =
    useState<HeroCardCategory>("migration");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const cards = HERO_CARDS.filter((c) => c.category === activeCategory);

  const handleCardClick = useCallback(
    async (card: HeroCard) => {
      try {
        await navigator.clipboard.writeText(card.code);
        setToastMessage(
          `Copied ${card.pallet}.${card.target} — switching to ${card.chainKey}`,
        );
      } catch {
        setToastMessage(`Switching to ${card.chainKey} (copy failed)`);
      }
      setShowToast(true);
      onChainSelect?.(card.chainKey);
    },
    [onChainSelect],
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Quick-start examples
          </CardTitle>
          <CardDescription>
            Curated, copy-pasteable PAPI snippets. Click a card to copy its code
            and jump to the target chain.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="space-y-3">
            {cards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(card)}
                className="w-full text-left p-3 rounded-md border bg-muted/30 hover:bg-muted/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {card.kind === "tx" ? (
                        <Send className="w-3.5 h-3.5 flex-shrink-0" />
                      ) : (
                        <Database className="w-3.5 h-3.5 flex-shrink-0" />
                      )}
                      <span className="font-medium text-sm truncate">
                        {card.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {card.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-[10px]">
                        {card.chainKey}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {card.pallet}.{card.target}
                      </Badge>
                      {card.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Copy className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Toast
        message={toastMessage}
        show={showToast}
        onHide={() => setShowToast(false)}
      />
    </>
  );
}
