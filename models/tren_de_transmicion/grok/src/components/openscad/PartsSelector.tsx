/**
 * TwinLock-253 - Selector de Piezas para Exportación OpenSCAD
 */

import { useState } from "react";
import { Download, CheckSquare, Square, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  AVAILABLE_PARTS,
  PART_CATEGORIES,
  getPartsByCategory,
  type PartInfo,
} from "@/openscad/parts-list";
import { downloadOpenSCADSelected } from "@/openscad/export";

interface PartsSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PartsSelector({ open, onOpenChange }: PartsSelectorProps) {
  const [selectedParts, setSelectedParts] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(PART_CATEGORIES.map((c) => c.id))
  );

  const togglePart = (partId: string) => {
    setSelectedParts((prev) => {
      const next = new Set(prev);
      if (next.has(partId)) {
        next.delete(partId);
      } else {
        next.add(partId);
      }
      return next;
    });
  };

  const toggleCategory = (categoryId: string) => {
    const categoryParts = getPartsByCategory(categoryId);
    const allSelected = categoryParts.every((p) => selectedParts.has(p.id));

    setSelectedParts((prev) => {
      const next = new Set(prev);
      for (const part of categoryParts) {
        if (allSelected) {
          next.delete(part.id);
        } else {
          next.add(part.id);
        }
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedParts.size === AVAILABLE_PARTS.length) {
      setSelectedParts(new Set());
    } else {
      setSelectedParts(new Set(AVAILABLE_PARTS.map((p) => p.id)));
    }
  };

  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const handleExport = () => {
    const partIds = Array.from(selectedParts);
    downloadOpenSCADSelected(partIds);
    onOpenChange(false);
  };

  const allSelected = selectedParts.size === AVAILABLE_PARTS.length;
  const someSelected = selectedParts.size > 0 && !allSelected;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl max-h-[80vh] bg-background rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <h2 className="text-lg font-semibold">Exportar a OpenSCAD</h2>
            <p className="text-sm text-muted-foreground">
              Selecciona las piezas que deseas exportar
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {selectedParts.size} / {AVAILABLE_PARTS.length} piezas
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[50vh] p-4">
          {/* Select All */}
          <div className="flex items-center gap-2 pb-3 border-b border-border mb-3">
            <button
              type="button"
              onClick={toggleAll}
              className="flex items-center gap-2 text-sm font-medium"
            >
              {allSelected ? (
                <CheckSquare className="h-4 w-4" />
              ) : someSelected ? (
                <div className="h-4 w-4 border-2 border-primary rounded flex items-center justify-center">
                  <div className="h-2 w-2 bg-primary rounded-sm" />
                </div>
              ) : (
                <Square className="h-4 w-4" />
              )}
              Seleccionar todo
            </button>
          </div>

          {/* Categories */}
          {PART_CATEGORIES.map((category) => {
            const categoryParts = getPartsByCategory(category.id);
            const selectedCount = categoryParts.filter((p) =>
              selectedParts.has(p.id)
            ).length;
            const allCategorySelected = selectedCount === categoryParts.length;
            const someCategorySelected =
              selectedCount > 0 && !allCategorySelected;
            const isExpanded = expandedCategories.has(category.id);

            return (
              <div key={category.id} className="mb-3">
                {/* Category Header */}
                <div className="flex items-center gap-2 py-2">
                  <button
                    type="button"
                    onClick={() => toggleCategoryExpand(category.id)}
                    className="flex items-center"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center gap-2 text-sm font-medium flex-1"
                  >
                    {allCategorySelected ? (
                      <CheckSquare className="h-4 w-4" />
                    ) : someCategorySelected ? (
                      <div className="h-4 w-4 border-2 border-primary rounded flex items-center justify-center">
                        <div className="h-2 w-2 bg-primary rounded-sm" />
                      </div>
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ background: category.color }}
                    />
                    {category.name}
                      <Badge variant="default" className="ml-2">
                      {selectedCount}/{categoryParts.length}
                    </Badge>
                  </button>
                </div>

                {/* Category Parts */}
                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {categoryParts.map((part) => (
                      <PartItem
                        key={part.id}
                        part={part}
                        selected={selectedParts.has(part.id)}
                        onToggle={() => togglePart(part.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleExport} disabled={selectedParts.size === 0}>
            <Download className="h-4 w-4 mr-2" />
            Exportar {selectedParts.size > 0 ? `(${selectedParts.size})` : ""}
          </Button>
        </div>
      </div>
    </div>
  );
}

function PartItem({
  part,
  selected,
  onToggle,
}: {
  part: PartInfo;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-2 w-full p-2 rounded-md text-left text-sm transition-colors ${
        selected
          ? "bg-primary/10 text-primary"
          : "hover:bg-muted text-muted-foreground hover:text-foreground"
      }`}
    >
      {selected ? (
        <CheckSquare className="h-4 w-4 shrink-0" />
      ) : (
        <Square className="h-4 w-4 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{part.name}</div>
        <div className="text-xs truncate opacity-70">{part.description}</div>
      </div>
      {!part.printable && (
        <Badge variant="outline" className="text-xs">
          Compra
        </Badge>
      )}
    </button>
  );
}
