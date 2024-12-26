import React from 'react'

interface NotionBlockProps {
  block: any
}

const renderRichText = (richText: any[]) => {
  return richText.map((text, index) => {
    if (!text.plain_text) return null

    let content = text.plain_text

    if (text.annotations.bold) {
      content = <strong key={index}>{content}</strong>
    }

    if (text.annotations.italic) {
      content = <em key={index}>{content}</em>
    }

    if (text.annotations.code) {
      content = <code key={index} className="bg-gray-200 p-1 rounded">{content}</code>
    }

    if (text.href) {
      content = (
        <a key={index} href={text.href} className="text-blue-600 underline">
          {content}
        </a>
      )
    }

    return <React.Fragment key={index}>{content}</React.Fragment>
  })
}

const NotionBlock: React.FC<NotionBlockProps> = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
      return <p className="mb-4">{renderRichText(block.paragraph.rich_text)}</p>
    case 'heading_1':
      return <h1 className="text-3xl font-bold mb-4">{renderRichText(block.heading_1.rich_text)}</h1>
    case 'heading_2':
      return <h2 className="text-2xl font-bold mb-3">{renderRichText(block.heading_2.rich_text)}</h2>
    case 'heading_3':
      return <h3 className="text-xl font-bold mb-2">{renderRichText(block.heading_3.rich_text)}</h3>
    case 'bulleted_list_item':
      return (
        <ul className="list-disc ml-6">
          <li>{renderRichText(block.bulleted_list_item.rich_text)}</li>
        </ul>
      )
    case 'numbered_list_item':
      return (
        <ol className="list-decimal ml-6">
          <li>{renderRichText(block.numbered_list_item.rich_text)}</li>
        </ol>
      )
    case 'to_do':
      return (
        <div className="flex items-center mb-2">
          <input type="checkbox" checked={block.to_do.checked} readOnly className="mr-2" />
          {renderRichText(block.to_do.rich_text)}
        </div>
      )
    case 'image':
      return (
        <img
          src={block.image.file?.url || block.image.external?.url}
          alt={block.image.caption[0]?.plain_text || "Blog post image"}
          className="my-4 rounded-lg"
        />
      )
    case 'equation':
      return (
        <div className="bg-gray-100 rounded p-2 my-4">
          <code>{block.equation.expression}</code>
        </div>
      )
    case 'child_page':
      return <p className="italic text-gray-600">Child Page: {block.child_page.title}</p>
    case 'unsupported':
      return <p className="italic text-red-600">Unsupported block type</p>
    default:
      return <p className="italic text-gray-500">Unknown block type: {block.type}</p>
  }
}

interface NotionBlocksProps {
  blocks: any[]
}

const NotionBlocks: React.FC<NotionBlocksProps> = ({ blocks }) => {
  const renderBlocks = (blocks: any[], depth = 0) => {
    return blocks.map((block) => (
      <div key={block.id} style={{ marginLeft: depth * 20 }}>
        <NotionBlock block={block} />
        {/* ネストされたブロックを再帰的にレンダリング */}
        {block.children && renderBlocks(block.children, depth + 1)}
      </div>
    ))
  }

  return <div>{renderBlocks(blocks)}</div>
}

export default NotionBlocks
