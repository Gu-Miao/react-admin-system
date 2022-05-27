import { ReactComponent as NotFound } from '@/assets/images/not-found.svg'

function Error() {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-gray-100">
      <NotFound style={{ width: 500, marginTop: -200 }} className="h-auto mb-10" />
      <h1 className="text-4xl font-medium mb-5">404 Not Found</h1>
      <p className="text-lg text-gray-500">
        The page you visit is not found, please go back home or try again
      </p>
    </div>
  )
}
export default Error
