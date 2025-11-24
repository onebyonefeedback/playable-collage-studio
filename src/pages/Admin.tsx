import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {supabase} from '@/integrations/supabase/client';
import {useToast} from '@/hooks/use-toast';
import {Trash2, Plus, LogOut} from 'lucide-react';

interface PortfolioItem {
    id: string;
    title: string;
    thumbnail_url: string;
    video_url: string | null;
    playable_url: string | null;
    display_order: number;
}

export default function Admin() {
    const navigate = useNavigate();
    const {toast} = useToast();
    const [loading, setLoading] = useState(true);
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [newItem, setNewItem] = useState({
        title: '',
        thumbnailFile: null as File | null,
        videoFile: null as File | null,
        playableFile: null as File | null,
    });

    useEffect(() => {
        checkAuth();
        fetchPortfolioItems();
    }, []);

    const checkAuth = async () => {
        const {data: {session}} = await supabase.auth.getSession();
        if (!session) {
            navigate('/auth');
        }
    };

    const fetchPortfolioItems = async () => {
        try {
            const {data, error} = await supabase
                .from('portfolio_items')
                .select('*')
                .order('display_order', {ascending: true});

            if (error) throw error;
            setPortfolioItems(data || []);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
            toast({
                title: 'Error',
                description: 'Failed to load portfolio items',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            let thumbnail_url = '';
            let video_url = '';
            let playable_url = '';

            // Upload thumbnail
            if (newItem.thumbnailFile) {
                const fileName = `thumbnails/${Date.now()}-${newItem.thumbnailFile.name}`;
                const { error: uploadError } = await supabase.storage
                    .from('playables')
                    .upload(fileName, newItem.thumbnailFile);

                if (uploadError) throw uploadError;
                
                const { data } = supabase.storage.from('playables').getPublicUrl(fileName);
                thumbnail_url = data.publicUrl;
            }

            // Upload video
            if (newItem.videoFile) {
                const fileName = `videos/${Date.now()}-${newItem.videoFile.name}`;
                const { error: uploadError } = await supabase.storage
                    .from('playables')
                    .upload(fileName, newItem.videoFile);

                if (uploadError) throw uploadError;
                
                const { data } = supabase.storage.from('playables').getPublicUrl(fileName);
                video_url = data.publicUrl;
            }

            // Upload playable HTML
            if (newItem.playableFile) {
                const fileName = `playables/${Date.now()}-${newItem.playableFile.name}`;
                const { error: uploadError } = await supabase.storage
                    .from('playables')
                    .upload(fileName, newItem.playableFile, { contentType: 'text/html' });

                if (uploadError) throw uploadError;
                
                const { data } = supabase.storage.from('playables').getPublicUrl(fileName);
                playable_url = data.publicUrl;
            }

            if (!thumbnail_url) {
                toast({
                    title: 'Error',
                    description: 'Thumbnail is required',
                    variant: 'destructive',
                });
                return;
            }

            const { error } = await supabase.from('portfolio_items').insert([{
                title: newItem.title,
                thumbnail_url,
                video_url: video_url || null,
                playable_url: playable_url || null,
                display_order: portfolioItems.length,
            }]);

            if (error) throw error;

            toast({
                title: 'Success',
                description: 'Portfolio item added successfully',
            });
            
            setNewItem({ 
                title: '', 
                thumbnailFile: null, 
                videoFile: null, 
                playableFile: null 
            });
            
            fetchPortfolioItems();
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to add portfolio item',
                variant: 'destructive',
            });
        }
    };

    const handleDeleteItem = async (id: string) => {
        try {
            const {error} = await supabase
                .from('portfolio_items')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast({
                title: 'Success',
                description: 'Portfolio item deleted successfully',
            });

            fetchPortfolioItems();
        } catch (error) {
            console.error('Error deleting item:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete portfolio item',
                variant: 'destructive',
            });
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/auth');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-xl font-mono">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Portfolio Admin</h1>
                    <div className="flex gap-4">
                        <Button variant="outline" onClick={() => navigate('/')}>
                            Back to Site
                        </Button>
                        <Button variant="destructive" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2"/>
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Add New Item Form */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="w-5 h-5"/>
                            Add New Portfolio Item
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="thumbnailFile">Thumbnail Image * (upload from computer)</Label>
                                <Input
                                    id="thumbnailFile"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNewItem({...newItem, thumbnailFile: e.target.files?.[0] || null})}
                                    required
                                    className="cursor-pointer"
                                />
                            </div>
                            <div>
                                <Label htmlFor="videoFile">Video Preview (optional - upload from computer)</Label>
                                <Input
                                    id="videoFile"
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setNewItem({...newItem, videoFile: e.target.files?.[0] || null})}
                                    className="cursor-pointer"
                                />
                            </div>
                            <div>
                                <Label htmlFor="playableFile">Playable Ad HTML (optional - upload from computer)</Label>
                                <Input
                                    id="playableFile"
                                    type="file"
                                    accept=".html"
                                    onChange={(e) => setNewItem({...newItem, playableFile: e.target.files?.[0] || null})}
                                    className="cursor-pointer"
                                />
                            </div>
                            </div>
                            <Button type="submit" className="w-full">
                                <Plus className="w-4 h-4 mr-2"/>
                                Add Portfolio Item
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Existing Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                            <div className="aspect-[9/16] overflow-hidden bg-muted">
                                <img
                                    src={item.thumbnail_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="w-full"
                                >
                                    <Trash2 className="w-4 h-4 mr-2"/>
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
