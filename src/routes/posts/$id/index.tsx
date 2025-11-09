import { usePost } from '@/hooks/post/use-post'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import Loading from '@/components/common/loading'
import { CircleAlert } from 'lucide-react'
import CategoryName from '@/components/post-screen/category-name'
import { createFileRoute } from '@tanstack/react-router'
import PostImageSlider from '@/components/post-screen/post-image-slider'

export const Route = createFileRoute('/posts/$id/')({
  component: PostDetail,
})

function PostDetail() {
  const postId = Route.useParams().id
  const { isLoading, data } = usePost(postId)
  const post = data?.result

  if (isLoading) {
    return <Loading />
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center">
        <CircleAlert size={36} color="gray" />
        <p>등록된 상품이 없습니다.</p>
      </div>
    )
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <PageLayOut.HeaderSection.BackIcon />
          <PageTitle>활동 상세</PageTitle>
        </PageLayOut.HeaderSection>
        <PageLayOut.BodySection padding="zero" className="m-0">
          <PostImageSlider imageUrls={post.imageUrls} />
          <div className="flex flex-row items-center justify-between p-4">
            <div className="text-xl font-bold">{post.title}</div>
            <CategoryName category={post.infoCategoryName} />
          </div>
          <div className="flex flex-col text-start">
            <p className="border-b-2 px-4 pt-4 text-2xl font-bold text-black">소개</p>
            <p className="text-tertiary p-4 wrap-anywhere whitespace-break-spaces">
              {post.content}
            </p>
          </div>
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
    </PageLayOut.Container>
  )
}

export default PostDetail
