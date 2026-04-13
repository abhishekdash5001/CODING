# LCP  Largest content paint

it is how much time browser take to load the largest content it can be image or hero banner if it takes more than 2.5 s it

# why lcp is bad
1.TTFB server takes more time to send html
2. Browser takes long time find LCP
3.it takes long time to downaload  image
4. image was dowanloaded but css/js were blocking


## how to imporove LCP
1.use SSG
2.FetchPriority high
3.Some time js /css block so no ciritical use defer for them


# CLS Cummulative Layout shift
How much layout changes while its loading or updating while use is looking at it

## fix
1.Reserve images space by height and weight
2.Add Iframe wrap it in container and give them min-height 
3 some time it takes time to load font and wehn load it cas CLS so prload them 


# INP Interactive Next paint
it measure how quickly page loads after user first interaction like click if 200 ms is good if 500 ms
this mainly happens for main thread is block ui event are handled by main thread

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
