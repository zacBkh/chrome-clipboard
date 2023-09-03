export const handleCopyClick = async (textToCopy: string) => {
  try {
    await navigator.clipboard.writeText(textToCopy)
  } catch (error) {
    console.error('Copying to clipboard failed:', error)
  }
}
