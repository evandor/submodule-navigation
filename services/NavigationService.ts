import {useUrlHandlers} from "src/tabsets/specialHandling/SpecialUrls";

export function useNavigationService() {

  const placeholderPattern = /\${[^}]*}/gm

  const {getHandler} = useUrlHandlers(undefined)

  const init = async () => {
  }

  const browserTabFor = async (url: string): Promise<chrome.tabs.Tab> => {
    url = url.replace(placeholderPattern, "");
    console.log(` > opening url ${url} in current window`)


    // getting all tabs from this window
    const tabs: chrome.tabs.Tab[] = (await chrome.tabs.query({})) // url in queryInfo ignores fragments!
      .filter((t:chrome.tabs.Tab) => t.url === url)
    if (tabs.length === 0) {
      console.debug("tab not found, creating new one:", url)
      const createdTab = await chrome.tabs.create({
        active: true,
        pinned: false,
        url: url
      })
      return Promise.resolve(createdTab)
    }
    return Promise.resolve(tabs[0])
    // tabs
    //   .map(r => {
    //     let matchCondition = url === r.url
    //     // console.log("===>", matchCondition, url, r.url)
    //     // if (matchCondition) {
    //     //   if (!found) { // highlight only first hit
    //     //     found = true
    //     //     // console.debug("found something", r)
    //     //     //
    //     //     // const tabsForUrl = useTabsetsStore().tabsForUrl(url)
    //     //     // console.log("tabsForUrl", tabsForUrl)
    //     //     // const lastActive = _.min(_.map(tabsForUrl, tfu => tfu.tab.lastActive))
    //     //     // const {handleSuccess} = useNotificationHandler()
    //     //     // if (r.active) {
    //     //     //   console.log(`lastActive ${lastActive}, now: ${new Date().getTime()}, diff: ${new Date().getTime() - (lastActive || new Date().getTime())}`)
    //     //     //   if (lastActive && new Date().getTime() - lastActive > 1000 * 60) {
    //     //     //     handleSuccess(new ExecutionResult("", "already opened,...", new Map([["Refresh", new RefreshTabCommand(r.id!, url)]])))
    //     //     //   } else {
    //     //     //     handleSuccess(new ExecutionResult("", "already opened..."))
    //     //     //   }
    //     //     // } else {
    //     //     //   if (lastActive && new Date().getTime() - lastActive > 1000 * 60) {
    //     //     //     handleSuccess(new ExecutionResult("", "maybe outdated...", new Map([["Refresh?", new RefreshTabCommand(r.id!, url)]])))
    //     //     //   }
    //     //     // }
    //     //     // chrome.tabs.highlight({tabs: r.index});
    //     //     return Promise.resolve(r)
    //     //   }
    //     // }
    //   })
  }

  return {
    init,
    browserTabFor
  }

}


