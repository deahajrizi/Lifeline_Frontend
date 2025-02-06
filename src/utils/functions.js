export const alwaysScrollToTop = () => {
    return window.scroll(0,0)
};


export  const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}