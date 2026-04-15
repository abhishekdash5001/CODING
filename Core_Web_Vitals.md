# LCP  Largest content paint

it is how much time browser take to load the largest content it can be image or hero banner if it takes more than 2.5 s it

   ## why lcp is bad  

  ###
    1.Server is Slow 
       a- we can make page SSR SSG ISG
       b- caching
       c-CDN
       d -Database index
    
    2.Jacscript Blocking
      a -Split into small js files
      b - use web workers to fo heavy compuation
    

    3.CSS blocking 
      1.Dont use a single lasrge css file
      2. use css that is specifinc to main page and using style comanents or something this on toher component
      3.Remove un used css
  

    4.Image is TOO large
      1.use Webp
      2 height widhth predifend
      3.responsive image srcset ->moble desktip tab
    

    5 Image is discover late
      html is loaded but css loads later and we have background image prop that use image tag
    

    6 Resource delay --html arrives but image starts loadin later

     HTML -> <link rel='preload' href="imageurk/>

     oR

     <Image fetchPriorty='high'/>



# CLS Cummulative Layout shift
  How Much the layout shift when the page is fully loadeed if value is 0.1 its is best 0.1 to 0.25 needs imporovement more than 0.25 poor

  # Image with no height and width
    give hieght and width to image so that browser can reserve space for that
  
  # Hero banner pushes the content
    page is loaded but as soon as hero banner loaded it shift the page downward use postion fixed top 0
  # Font
    some time takes time load the font that caused jump its better have font locally
  # iframe adds with no height 
    add some minium height to these
  # Skelton is small 
    Skelton is 200px but descrption is for 300px


      ## fix
      1.Reserve images space by height and weight
      2.Add Iframe wrap it in container and give them min-height 
      3 some time it takes time to load font and wehn load it cas CLS so prload them  


# INP Interactive Next paint
it measure how quickly page loads after user first interaction like click if 200 ms is good if 500 ms
this mainly happens for main thread is block ui event are handled by main thread

  ## Layout thrashing
    We have click event that changes the layout by changing some height or width and then we are pfrcing the broswer to fethc owdth this haevy compouaton 
    and reflow work is more work for browser better use repaint if possible like transaltion and opacity

  ## Too many re  renders
    user types something and it renders along list that will take a lot of time use feels like search box is not working
   # fix 
   1.use Debouce so that we can limit the call to server 
   2.useDefered and useTransiotn to set some state updates less priority
   3,use Virtualiastion

  ## Js is overloaded with work
   1.if we have heavy logic main thread is busy working on all click event swill be waiting in macro task 
   # Fix
    use webworkers to take care of heavy works maint hread will take care of clicks
    code spliting webpack  on demand js loads


      ## how to avoid
      1.use webworkers
      2.Avoid layour thrasing
      3.Memsize user inout and response

      1) Keep urgent updates separate from non-urgent updates useTransion for non urgent state updates like updting this list one input is changed

      const [isPending, startTransition] = useTransition();

      startTransition(() => {
        setResults(newResults); <--- happend later
      });

useDeffred give laggin value of rapidly chaning state

# FID - first input delay

user clicks ---- FID ---- click event fires ---- handler finishes ---- paint
|--------------------------------------------------------------------------|
                                    INP

# FCP First content ful paint how much time take to do the paint it takes to see the first content it should be less than 1.8s


  # TTFB(Total time to first bite)  serer is slow send resonse very late 
    fix 
    1.SSG SSR 
    2.Caching
    3.CDN
    4 indeing in database
    5.load balance habing  2 3 ec2 instance
    6 GQL to make sure we are not over fetching

  # Reader JS - <normal srcipt will stop the pareser and downlaod script
    1. use defer so that parsor will not be blcoked
  

  # CSS Blocker   if you have hugge css it will stop load the csss 
   1.make sure that only hthose css is included that is used on the page
  
  # Clinet Side render 
   Html empty is renderd js calls api and then poulate dhtheml
   and also doent do heavy computed on component mount
   use SSG SSR code splting
  
  # Load every thing at first use react.lazy to load components on demand


# TTFB(total time to first bite)
  ## clinet send request to server and server send response and first byte of html comes in this TTFB

    1.Server is slow
    2 queries in db is not perfect
    3.Index is not there
    4 load balance isnot there
    5 no cdn
    6 over fetch


# Bundelling
ok so if we have 1big js and 1 big css bowser have to load everyting to just render the first pacge bad instead we should bunfle this up in small quantity and server it html 
  ## Webapack turbopack etc
  1.First they createa graph depedency structure to know what file is using what
  ## Resolve import 
  now budndler resolve imports to actualy file and rremove unused imports
  ## Tree shaking
    remove unsed code constant variable
  ## Code Split 
   convert file to main.js vendor.js lazy imported componet chart.chunk.js
  ## trnaspiler
   browser can only under js and css so bundler use traspiler liek babel to coner jsa tsx to js babel is notthere babel loader actualt tell where is thebabel and it works as link sass-loader css loader
  ## Minificatin
  ## hasing 
  it give random numebr tofile if ode change file nuber chage caching wil change
  
# Code Spliting
 It breaking 1 single js file in to small peaces so that browser doesnot need to load js for all tother pages in 1 go this helps in
 imporving LCP FCP,INP

  1.Route Based Spliting
   a Home will load home js
   b Product will load product js
  

  2.Component based Spliting
   a.if we are using a lib raary or some other component we can split it like this next js

    import dynamic from next

    const Chart = dynamic(() => import("./Chart"), {
      ssr: false,
      loading: () => <p>Loading map...</p>,
    });


    export default function Page() {
      return <Chart />;
    }


  this will make anpther chunk for chart.js

  3.Interaction based
  if we modal that will show up on user click we can do something like

  import Modal from '..//'
    async function openModal() {
      const Modal = await import("./Modal");
    }
     used for opening modal map editot


     i usally split charts/map and editor by using react.lazy next.dynamic


  
# Lazy Loading 
  Laoading something when its actually in needed not every thing in 1 go

  we can lazy load images map widgets modal component  
  MAKE SURE LCP if image is not lazy loaded its priority  so that it will not imakce lCP 

  using lazy loading will imprive LCP,FCP,INP,Hydration,bundleing


# Render-blocking CSS/JS

When HTML start parsing the HTML and see css /js it stops the parsing and downalod these files first then continue the parser
 1 Dom dowanloads html
 2.Creates DOM
 3.Downalods CSS to make cssom
 4 DOM and CSSOm combine
 4.Reflow layout
 6.Repaint
 7 js hydartion

  ##   Why CSS blocks render
   supppose we have a large css it measn home page is loading css for all other pages this impaces LCP FCP 
    1.use component based css
    2. remove un used css
    3.use inline rarely
  
  ##  Why js is bloker
  HTML is getting parsed and parser sees this

   <script src="/main.js"></script>
   pareser will stop and download this script and start execution then pareser will again start with html
   1.use Defer
    a- Script will be downaloded parallerly
    b Will be executed ofter parsing of html is done
    c - Will execute befreo comcontent load
    d preserves the order 

    good for anlyatics that read doms ,depedent scripts ,mainjs

   2. use Async
   a- Script will be downaloded parallerly
    b Will be executed on donlaod is done
    c doesnot preserve order

    good anytics ads  tracking

  for eg if we have react compoent in that wewe are using chart map better use dynaimc form next to lazy load these makethe budle sixe small


  common killers 
   GTM,HotZar ,adds ,chat widget
   fix load after consent ,async defer ,aufit GTML


   ### React Profiler helps identify slow React renders and unnecessary re-renders. I use it to record interactions, check render duration, see which component

# Hydration

  SSG SSR gives html to cleint browser has to the download the js execute it and aattach event handlers to make it interactive  this is hydration 
  if lots of things need to be downloaded then hydration cost will become more
  
  # BAD                                                                                 # Good
  1. Dont make every compoennt client side unless inetraction is there                   Add use client or states only on the specif compoennt
  2.Dont import all charts maps on the go                                                  use Lazy loadin fo hevay js library in compoent


## Production monitoring / RUM

    real LCP
    real INP
    real CLS
    real page load times
    real slow routes
    device/browser breakdown


    use Data dog
    Oncrawl 

    Dev profiling = why is this component slow?  detailed component profiling is usually done in dev, but real performance measurement must also happen in production.
    Prod monitoring = are real users actually slow?
  


# Caching + CDN

  Caching means saving the response /pge so that it will not dowanloaded /fetched agaiin when required

  it is not always neccesry that cleint is slow some time server can be slow bcz of hevy traffic no caching,high server load ,no indexing so we Caching to make it fast

  1.Browser Caching
  for the frist time when user hits a url it downnloads the main..js. main.css font and it s cached in the browser so it can be re used 
  it is controlleed by headers like cache control etag 
  cahcecontrol :  it has 3 parts cache can be used in brwser/cdn and expriy date  and file will not change for same url

  2 CDN Content delivery netweork 
   we stores data /pages all arounf the world so the distance btween the user and server beccomes less and this will hepl in netwrok letancy ,TTFB,LCP

   Caching IN CDN if cached in cdn it will never reach server

  3.Server caching
   we can cahcing serach result  product data we can use redis or memory of server for the sane so that agan compuation is not required
  

  4.Framwork caching like we have next js

  Caching reduces repeated work.
  CDN reduces distance.
  Together they improve speed and scale.


# How to improve perfomace
# code Spliting
instead of having everything in 1 mainjs we can split it a  bc f d and download it on deamd 
react.lazy(()=>import('../path'))
use suspence


# Buddalling
BUndling is packing the code for the browser
its is done by webpack turbo vite
so first bundlers create a graph 

1.then resolve the import @/,,, or resolve imports to actual files
2. Transpilation converting jsx ts mordern js to browser readible js babel is used for this so webpack doesnot know babel babel loader acts as link b/w webapck and babel
It tells Webpack:

“when you see .js, .jsx, .ts, .tsx files, send them to Babel first.”
3.Tree shaking it removed unused import too
7) Code splitting
8.Lazy import if we dynamicaly importing compoennt it makes a sepeate bundle
9 Minificaion
14) Vendor chunk creation  - vendor.js for things in nodemodules



# Bundle Optimization
1.Reduce Bundle Size
  tree shaking
  removed unused code
  import only what is needed

2.Code splitting 
  Dynsmic Chuks
  vendor chunks
  route chunks

3.Ship less client-side JavaScript

4.Optimize assets that participate in the bundle

5 Long-term caching  main.as223.js this cached number

Bundle optimization = smaller + fewer + smarter bundles


# Image Optimization

1 fetchprototy true for hero
2.lazy load image not in view
3.give hght and width
4/use Webp

# Proflinh
it means diagnosing perfomrance problems
1.which component render
2.render time
3.paint and reflow cost
4 script timing
React DevTools Profiler


# Render Optimizaion
 Less compoennt render how much time takes to render making render less costly 1) Prevent unnecessary rerenders
 small dom updates
