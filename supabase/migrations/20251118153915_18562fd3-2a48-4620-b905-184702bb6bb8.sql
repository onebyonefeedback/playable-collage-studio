-- Create portfolio table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  video_url TEXT,
  playable_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view portfolio)
CREATE POLICY "Portfolio items are viewable by everyone" 
ON public.portfolio_items 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to manage portfolio
CREATE POLICY "Authenticated users can insert portfolio items" 
ON public.portfolio_items 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update portfolio items" 
ON public.portfolio_items 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete portfolio items" 
ON public.portfolio_items 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_portfolio_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_portfolio_items_updated_at
BEFORE UPDATE ON public.portfolio_items
FOR EACH ROW
EXECUTE FUNCTION public.update_portfolio_updated_at();