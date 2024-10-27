import React from 'react'

const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue)

  return (
    <div className="w-full">
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab })
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeTab })
        }
        return child
      })}
    </div>
  )
}

const TabsList = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { activeTab, setActiveTab })
      })}
    </div>
  )
}

const TabsTrigger = ({ children, value, activeTab, setActiveTab }) => {
  return (
    <button
      className={`w-full rounded-lg px-3 py-2 text-sm font-medium ${
        activeTab === value
          ? 'bg-white text-blue-700 shadow'
          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ children, value, activeTab }) => {
  if (activeTab !== value) return null
  return <div>{children}</div>
}

export { Tabs, TabsList, TabsTrigger, TabsContent }