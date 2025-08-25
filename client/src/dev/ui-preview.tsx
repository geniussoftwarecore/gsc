import React from 'react'
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Label
} from '../../../crm_ui/components/base'

/**
 * UI Preview Page - Design System Component Showcase
 * 
 * This page displays all base components in both LTR and RTL layouts
 * for visual smoke testing and design system consistency validation
 */
export default function UIPreview() {
  const directions: Array<{ dir: 'ltr' | 'rtl'; label: string }> = [
    { dir: 'ltr', label: 'Left-to-Right (LTR)' },
    { dir: 'rtl', label: 'Right-to-Left (RTL)' }
  ]

  const ComponentShowcase = ({ direction }: { direction: 'ltr' | 'rtl' }) => (
    <div dir={direction} className="space-y-8 p-6">
      
      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Button Components</CardTitle>
          <CardDescription>All button variants and sizes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="gsc">GSC Brand</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🚀</Button>
          </div>
        </CardContent>
      </Card>

      {/* Card Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Basic Card</CardTitle>
            <CardDescription>Simple card with header</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here with some sample text.</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Enhanced Card</CardTitle>
            <CardDescription>Card with custom shadow</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="gsc">GSC Badge</Badge>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Branded Card</CardTitle>
            <CardDescription>Card with primary border</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Components */}
      <Card>
        <CardHeader>
          <CardTitle>Form Components</CardTitle>
          <CardDescription>Input fields and form elements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Text Input</Label>
              <Input placeholder="Enter your text..." />
            </div>
            <div className="space-y-2">
              <Label>Select Component</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Email Input</Label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label>Disabled Input</Label>
              <Input placeholder="Disabled field" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Badge Components</CardTitle>
          <CardDescription>Status indicators and labels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="gsc">GSC Brand</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Table Component */}
      <Card>
        <CardHeader>
          <CardTitle>Table Component</CardTitle>
          <CardDescription>Data table with consistent styling</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">أحمد محمد</TableCell>
                <TableCell><Badge variant="success">Active</Badge></TableCell>
                <TableCell>مطور</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">سارة أحمد</TableCell>
                <TableCell><Badge variant="warning">Pending</Badge></TableCell>
                <TableCell>مصممة</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">محمد علي</TableCell>
                <TableCell><Badge variant="info">Review</Badge></TableCell>
                <TableCell>مدير مشروع</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">Edit</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Component Combinations */}
      <Card>
        <CardHeader>
          <CardTitle>Combined Components</CardTitle>
          <CardDescription>Real-world component combinations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Profile Card */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 border rounded-lg">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              أ
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">أحمد المالكي</p>
              <p className="text-sm text-muted-foreground">مطور رئيسي</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="gsc">فريق التطوير</Badge>
              <Button size="sm">عرض الملف</Button>
            </div>
          </div>

          {/* Action Card */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="text-sm font-semibold">مراجعة التطبيق الجديد</h4>
              <p className="text-sm text-muted-foreground">يحتاج إلى مراجعة التصميم والكود</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="warning">عاجل</Badge>
              <Button size="sm" variant="primary">
                بدء المراجعة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Design System Preview</h1>
              <p className="text-muted-foreground">
                Visual showcase of all base components in light mode
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Direction Showcases */}
      {directions.map(({ dir, label }) => (
        <div key={dir} className="py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{label}</h2>
              <div className="h-1 w-16 bg-primary rounded"></div>
            </div>
            <ComponentShowcase direction={dir} />
          </div>
          {dir === 'ltr' && <hr className="my-8" />}
        </div>
      ))}

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            GSC Design System • All components maintain visual consistency
          </p>
        </div>
      </footer>
    </div>
  )
}