'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Eye,
  Bookmark,
  Share2,
  FileText,
  Video,
  Link2,
  CheckCircle,
  Book,
  Heart,
  TrendingUp,
  Palette,
  Shield,
  GraduationCap,
  ChevronRight,
  Clock,
  User,
  Tag,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

// Resource type definitions
interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'article' | 'guide' | 'checklist' | 'video' | 'download' | 'link';
  content?: string;
  fileUrl?: string;
  externalUrl?: string;
  thumbnailUrl?: string;
  author: string;
  readingTime?: number;
  tags: string[];
  viewCount: number;
  downloadCount: number;
  isFeatured: boolean;
  createdAt: string;
  publishedAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  resourceCount: number;
}

// Mock data for demonstration
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Parenting Tips',
    slug: 'parenting-tips',
    description: 'Helpful advice for parents and caregivers',
    icon: 'Heart',
    resourceCount: 15,
  },
  {
    id: '2',
    name: 'Child Development',
    slug: 'child-development',
    description: "Understanding your child's growth milestones",
    icon: 'TrendingUp',
    resourceCount: 12,
  },
  {
    id: '3',
    name: 'Activities & Crafts',
    slug: 'activities-crafts',
    description: 'Fun activities to do with your children',
    icon: 'Palette',
    resourceCount: 20,
  },
  {
    id: '4',
    name: 'Health & Safety',
    slug: 'health-safety',
    description: 'Keeping your children healthy and safe',
    icon: 'Shield',
    resourceCount: 10,
  },
  {
    id: '5',
    name: 'School Readiness',
    slug: 'school-readiness',
    description: 'Preparing your child for school',
    icon: 'GraduationCap',
    resourceCount: 8,
  },
];

const mockResources: Resource[] = [
  {
    id: '1',
    title: '10 Tips for Positive Parenting',
    description: 'Learn effective strategies for encouraging good behavior and building a strong relationship with your child.',
    category: 'parenting-tips',
    type: 'article',
    author: 'Sarah Johnson',
    readingTime: 5,
    tags: ['behavior', 'discipline', 'communication'],
    viewCount: 245,
    downloadCount: 0,
    isFeatured: true,
    createdAt: '2024-01-15',
    publishedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Developmental Milestones: Ages 2-3',
    description: 'A comprehensive guide to what to expect during the toddler years.',
    category: 'child-development',
    type: 'guide',
    author: 'Dr. Emily Chen',
    readingTime: 8,
    tags: ['milestones', 'toddlers', 'growth'],
    viewCount: 189,
    downloadCount: 67,
    isFeatured: false,
    createdAt: '2024-01-10',
    publishedAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'Weekly Activity Planner',
    description: 'Download our printable weekly activity planner to organize fun and educational activities.',
    category: 'activities-crafts',
    type: 'download',
    fileUrl: '/resources/weekly-planner.pdf',
    author: 'GBDC Team',
    tags: ['planning', 'activities', 'printable'],
    viewCount: 412,
    downloadCount: 234,
    isFeatured: true,
    createdAt: '2024-01-08',
    publishedAt: '2024-01-08',
  },
  {
    id: '4',
    title: 'Healthy Snack Ideas for Kids',
    description: 'Nutritious and delicious snack ideas that kids will love.',
    category: 'health-safety',
    type: 'checklist',
    author: 'Maria Rodriguez',
    readingTime: 3,
    tags: ['nutrition', 'snacks', 'health'],
    viewCount: 156,
    downloadCount: 45,
    isFeatured: false,
    createdAt: '2024-01-05',
    publishedAt: '2024-01-05',
  },
];

// Icon mapping
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Heart,
  TrendingUp,
  Palette,
  Shield,
  GraduationCap,
};

const typeIconMap = {
  article: FileText,
  guide: Book,
  checklist: CheckCircle,
  video: Video,
  download: Download,
  link: Link2,
};

export default function ResourceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'featured'>('recent');
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(mockResources);
  const [bookmarkedResources, setBookmarkedResources] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Filter resources based on category and search
  useEffect(() => {
    let filtered = [...resources];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        r =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort resources
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'featured':
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    setFilteredResources(filtered);
  }, [selectedCategory, searchQuery, sortBy, resources]);

  const handleBookmark = (resourceId: string) => {
    setBookmarkedResources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
        toast({
          title: 'Bookmark removed',
          description: 'Resource removed from your bookmarks.',
        });
      } else {
        newSet.add(resourceId);
        toast({
          title: 'Bookmarked!',
          description: 'Resource added to your bookmarks.',
        });
      }
      return newSet;
    });
  };

  const handleShare = async (resource: Resource) => {
    const url = `${window.location.origin}/resources/${resource.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title,
          text: resource.description,
          url,
        });
      } catch (err) {
        // Share cancelled or failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'Resource link copied to clipboard.',
      });
    }
  };

  const handleResourceAction = (resource: Resource) => {
    if (resource.type === 'download' && resource.fileUrl) {
      // Simulate download
      toast({
        title: 'Download started',
        description: `Downloading ${resource.title}...`,
      });
    } else if (resource.type === 'link' && resource.externalUrl) {
      window.open(resource.externalUrl, '_blank');
    } else {
      // Navigate to resource detail page
      toast({
        title: 'Opening resource',
        description: resource.title,
      });
    }
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Resource Library
        </h1>
        <p className="text-lg text-muted-foreground">
          Educational resources and materials to support your parenting journey
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start flex-wrap h-auto p-1">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            {mockCategories.map(category => {
              const Icon = iconMap[category.icon] || Heart;
              return (
                <TabsTrigger key={category.id} value={category.slug} className="gap-2">
                  <Icon className="h-4 w-4" />
                  {category.name}
                  <Badge variant="secondary" className="ml-1">
                    {category.resourceCount}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Resource Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredResources.map((resource, index) => {
          const TypeIcon = typeIconMap[resource.type];
          const isBookmarked = bookmarkedResources.has(resource.id);

          return (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={resource.isFeatured ? 'default' : 'secondary'}>
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {resource.type}
                    </Badge>
                    {resource.isFeatured && (
                      <Badge variant="default" className="bg-secondary">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {resource.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="space-y-3">
                    {/* Author and reading time */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {resource.author}
                      </span>
                      {resource.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {resource.readingTime} min read
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {resource.viewCount}
                      </span>
                      {resource.downloadCount > 0 && (
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {resource.downloadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>

                <Separator />

                <CardFooter className="pt-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleBookmark(resource.id)}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${
                            isBookmarked ? 'fill-current text-primary' : ''
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleShare(resource)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleResourceAction(resource)}
                    >
                      {resource.type === 'download' ? (
                        <>
                          Download
                          <Download className="ml-2 h-4 w-4" />
                        </>
                      ) : resource.type === 'link' ? (
                        <>
                          Visit
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Read More
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">
            No resources found matching your criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
}