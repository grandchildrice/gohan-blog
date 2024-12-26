import { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export interface NotionPage {
  id: string
  created_time: string
  last_edited_time: string
  properties: {
    Date: {
      id: string
      type: "date"
      date: { start: string; end: null; time_zone: null } | null
    }
    Language: {
      id: string
      type: "select"
      select: { id: string; name: string; color: string } | null
    }
    Status: {
      id: string
      type: "status"
      status: { id: string; name: string; color: string } | null
    }
    Category: {
      id: string
      type: "multi_select"
      multi_select: Array<{ id: string; name: string; color: string }>
    }
    Title: {
      id: "title"
      type: "title"
      title: Array<{ type: string; text: { content: string; link: null } }>
    }
  }
  url: string
  public_url: string | null
}

export interface BlogPost {
  id: string
  title: string
  date: string | null
  language: string | null
  status: string | null
  categories: string[]
  url: string
  publicUrl: string | null
  content: (PartialBlockObjectResponse | BlockObjectResponse)[]
}

