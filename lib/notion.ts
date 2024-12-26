import { Client } from '@notionhq/client'
import { NotionPage, BlogPost } from '@/types/notion'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID

    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID is not defined')
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Status',
            status: {
              equals: 'Done'
            }
          },
          {
            property: 'Category',
            multi_select: {
              does_not_contain: 'intro'
            }
          }
        ]
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    })

    return response.results.map((page) => {
      const typedPage = page as unknown as NotionPage
      const title = typedPage.properties.Title.title[0]?.text.content ?? 'Untitled'
      const date = typedPage.properties.Date.date?.start ?? null
      const language = typedPage.properties.Language.select?.name ?? null
      const status = typedPage.properties.Status.status?.name ?? null
      const categories = typedPage.properties.Category.multi_select.map(cat => cat.name)

      return {
        id: typedPage.id,
        title,
        date,
        language,
        status,
        categories,
        url: typedPage.url,
        publicUrl: typedPage.public_url,
        content: [],
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const response = await notion.pages.retrieve({ page_id: id })
    const typedPage = response as unknown as NotionPage

    const title = typedPage.properties.Title.title[0]?.text.content ?? 'Untitled'
    const date = typedPage.properties.Date.date?.start ?? null
    const language = typedPage.properties.Language.select?.name ?? null
    const status = typedPage.properties.Status.status?.name ?? null
    const categories = typedPage.properties.Category.multi_select.map(cat => cat.name)

    const blocks = await notion.blocks.children.list({
      block_id: id,
      page_size: 100,
    })

    console.log(blocks.results)

    return {
      id: typedPage.id,
      title,
      date,
      language,
      status,
      categories,
      url: typedPage.url,
      publicUrl: typedPage.public_url,
      content: blocks.results,
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

