# n8n Automation Guide: Blog Publishing to Sanity

This guide provides the necessary technical details to set up an automated workflow that publishes articles to your Sanity backend.

## Prerequisites
1. **Sanity API Token**: Generate a token with "Write" access in your Sanity Manage dashboard (Settings > API).
2. **Sanity Project ID**: `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. **Dataset**: `production` (default)
4. **Endpoint**: `https://[PROJECT_ID].api.sanity.io/v2024-03-20/data/mutate/[DATASET]`

## n8n HTTP Request Configuration

### Method: `POST`
### Authentication: `Header`
- **Key**: `Authorization`
- **Value**: `Bearer YOUR_SANITY_WRITE_TOKEN`

### JSON Body (Mutations)
To create a new post, use the following structure. Replace placeholders with your dynamic data from the blog generator.

```json
{
  "mutations": [
    {
      "create": {
        "_type": "post",
        "title": "Your Generated Blog Title",
        "slug": {
          "_type": "slug",
          "current": "your-url-safe-slug"
        },
        "publishedAt": "2024-10-24T10:00:00Z",
        "seoTitle": "Pest Control Noida | Your Seo Optimized Title",
        "seoDescription": "A compelling meta description for search results.",
        "featured": false,
        "mainImageExternalUrl": "https://res.cloudinary.com/your-cloud/image-123.jpg",
        "mainImageExternalAlt": "Description of the image content",
        "body": [
          {
            "_key": "unique-block-1",
            "_type": "block",
            "children": [
              {
                "_key": "child-1",
                "_type": "span",
                "marks": [],
                "text": "This is the first paragraph of your blog post content."
              }
            ],
            "markDefs": [],
            "style": "normal"
          }
        ]
      }
    }
  ]
}
```

## Key Fields Explained
- **`mainImageExternalUrl`**: Since you use Cloudinary, you can provide the link directly here. The site is already configured to prefer this over uploaded images.
- **`body`**: Sanity uses "Portable Text" (JSON-based). If your blog generator outputs Markdown, you can use a Markdown-to-PortableText node in n8n or use a simple regex to wrap paragraphs.
- **`publishedAt`**: Set this to the current time or a future time for scheduling.

## Automated Verification
After publishing, the site will automatically update within **60 seconds** (due to the `revalidate = 60` update we've made).

> [!TIP]
> Ensure the **slug** is URL-safe (lowercase, hyphens only).
