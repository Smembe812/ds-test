
# Headline

> An awesome project.
<script>
    const button = document.querySelector('#some')
    button.addEventListener("click", click)
    
    function click(){
        alert('You clicked me')
    }
</script>

<style>
    .btn {
        background: blue;
        color: white;
        padding: 1em;
        width: 100%
    }
</style>

### Blue button Example
<button id="some" class="btn">Click</button>
<!-- tabs:start -->

#### ** HTML **
```html
<button id="some" class="btn" onclick="">Click</button>
```
#### ** CSS **
```css
.btn {
        background: blue;
        color: white;
        padding: 1em;
        width: 100%
}

```

#### ** JS **

```js
const button = document.querySelector('#some')

button.addEventListener("click", click)

function click(){
    alert('You clicked me')
}
```

<!-- tabs:end -->


~~~
<div></div>
~~~

~~~~ruby startline=3 $%@#$
def foo(x)
  return 3
end
~~~~~~~

<p>{{firstname}} {{lastname}}</p>