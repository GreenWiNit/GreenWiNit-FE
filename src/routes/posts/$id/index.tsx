import { usePost } from '@/hooks/post/use-post'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import Loading from '@/components/common/loading'
import { CircleAlert } from 'lucide-react'
import CategoryName from '@/components/post-screen/category-name'
import { createFileRoute } from '@tanstack/react-router'

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
      <PageLayOut.HeaderSection>
        <PageLayOut.HeaderSection.BackIcon />
        <PageTitle>활동 상세</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection padding="zero" className="m-0">
        <div className="w-full bg-green-50">
          <img src={post.imageurl} className="w-full" />
        </div>
        <div className="flex flex-row items-center justify-between p-4">
          <div className="text-xl font-bold">{post.title}</div>
          <CategoryName category={post.infoCategoryName} />
        </div>
        <div className="flex flex-col text-start">
          <p className="text-secondary border-b-2 px-4 pt-4 text-xl font-bold">소개</p>
          <p className="text-tertiary p-4 wrap-anywhere whitespace-break-spaces">{post.content}</p>
        </div>
      </PageLayOut.BodySection>
    </PageLayOut.Container>
  )
}

export default PostDetail
