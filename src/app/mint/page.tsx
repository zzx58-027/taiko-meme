import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/auto/button'

const Page = () => {
  const card = {
    title: 'Fair mint Pepe',
    description: 'Card Description',
    content: 'Card Content',
    footer: 'Card Footer'
  }

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>{card.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{card.content}</p>
        <Input placeholder="Term, days (1 - 466)" />
      </CardContent>
      <CardFooter>
        <p>{card.footer}</p>
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  )
}

export default Page
