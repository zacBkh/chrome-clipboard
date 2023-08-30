export const handleCopyClick = async (textToCopy: string) => {
  try {
    await navigator.clipboard.writeText(textToCopy)
    // setIsCopied(true)
    // setTimeout(() => setIsCopied(false), 2000) // Reset copied state after 2 seconds
  } catch (error) {
    console.error('Copying to clipboard failed:', error)
  }
}
