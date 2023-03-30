import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={0.6}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="105" y="6" rx="0" ry="0" width="169" height="107" /> 
    <rect x="105" y="148" rx="0" ry="0" width="165" height="12" /> 
    <rect x="105" y="132" rx="0" ry="0" width="165" height="12" />
  </ContentLoader>
)

export default MyLoader

