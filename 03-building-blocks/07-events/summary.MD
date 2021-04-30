# Concepts

- [**Events**](https://developer.mozilla.org/en-US/docs/Web/Events) are actions or occurrences that happen in the system you are programming — the system produces (or "fires") a signal of some kind when an event occurs, and provides a mechanism by which an action can be automatically taken (that is, some code running) when the event occurs.

- Each available Event has an **Event Handler**, which is a block of code (usually a JavaScript function that you as a programmer create) that runs when the event fires.

- When such a Event Handler is defined to run in response to an event, we say we are **registering** an Event Handler.

- *Note 1:* **Event Handlers** are sometimes called **Event Listeners** — they are pretty much interchangeable for our purposes, although strictly speaking, they work together. The listener listens out for the event happening, and the handler is the code that is run in response to it happening.

- *Note 2:* Web events are not part of the core JavaScript language — they are defined as part of the APIs built into the browser.

# Event Handler methods

## Event Handler property

- The `onclick` `btn` property is an event handler property, and when you set it to be equal to some code (an anonymous function or a named function name), that code is run when the event fires on the button: 

	``` 
	btn.onclick = function() {
		//code
	}
	``` 

	or 

	``` 
	btn.onclick = someFunction;
	``` 

## Event Handler inside HTML attributes

- **[ALERT: Don't use this method!]** The earliest method of registering event handlers found on the Web involved event handler HTML attributes (or inline event handlers):

	`<button  onclick="bgChange()">Change color</button>`
	where the function is defined inside `script` HTML tag on the same page, or

	`<button onclick="alert('Hello, this is my old-fashioned event handler!');">Press me</button>`


- The attribute value is literally the JavaScript code you want to run when the event occurs.

- However, you **SHOULDN'T** use these — they are considered bad practice. They quickly become unmanageable and inefficient.

## `addEventListener()` method

- The modern mechanism for adding event handlers is the `addEventListener()` method. 

### Advantages

- It has methods to remove Event Listeners:

1. First, there is a counterpart function, `removeEventListener()`, which removes a previously added event handler. For example, this would remove the event handler set in the first code block in this section:

	`btn.removeEventListener('click', someFunction);`

2. Event handlers can also be removed by passing an `AbortSignal` to `addEventListener()` and then, later, calling `abort()` on the controller owning the `AbortSignal`. For example, to add an event handler that we can remove with an `AbortSignal`:

	```
	const controller = new AbortController();
	btn.addEventListener('click', function() {
		//code
	}, { signal: controller.signal }); // pass an AbortSignal to this handler

	controller.abort(); // removes any/all event handlers associated with this controller
	``` 

	For larger, more complex programs, this can improve efficiency. Plus, the ability to remove event handlers allows you to have the same button performing different actions in different circumstances — all you have to do is add or remove handlers.

- The second advantage that `addEventListener()` has over the older mechanisms discussed here earlier is that it allows you to register multiple handlers for the same listener. The following two handlers wouldn't both be applied:

	```
	myElement.onclick = functionA;
	myElement.onclick = functionB;
	```
	
	The second line overwrites the value of onclick set by the first line. What would work, however, is the following:

	```
	myElement.addEventListener('click', functionA);
	myElement.addEventListener('click', functionB);
	```

### Which mecanism should I use?

- First of all, you shouldn't use the HTML event handler attributes.

- The other two are relatively interchangeable, at least for simple uses:
	-  Event handler properties have less power and options, but better cross-browser compatibility (being supported as far back as Internet Explorer 8). You should probably start with these as you begin learning.
	- DOM Level 2 Events (`addEventListener()`, etc.) are more powerful, but can also become complex and are less well supported (supported as far back as Internet Explorer 9). You should also experiment with these, and try to use them where possible.
	
- The main advantages of the third mechanism are that you can remove event handler code if needed and you can add multiple listeners of the same type to elements if required. 

# Event object

- Sometimes, inside an event handler function, you'll see a parameter specified with a name such as `event`, `evt`, or `e` (most commonly used, we could set any name). This is called the **Event Object**, and it is automatically passed to **Event Handlers** to provide extra features and information. For example:

	```
	function bgChange(e) {
		const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
		e.target.style.backgroundColor = rndCol;
		console.log(e);
	}
	```

	here you can see we are including an event object, `e`, in the function, and in the function setting a background color style on `e.target` — which is the button itself. **The target property of the event object is always a reference to the element the event occurred upon.** So, in this example, we are setting a random background color on the **button**, not the **page**.
	`e.target` is incredibly useful when you want to **set the same event handler on multiple elements** and do something to all of them when an event occurs on them.

# Prevent Default Behaviour

- Sometimes, you'll come across a situation where you want to prevent an Event Handler from doing what it does by default. For example, inside a `form.onsubmit` Event Handler we can call the `preventDefault()` function on the event object — which stops the form submission — and then display an error message in the paragraph below our form to tell the user what's wrong.

# Event Bubbling and Capture

- When an event is fired on an element that has parent elements, modern browsers run two different phases — the Capturing phase and the Bubbling phase.

- In the capturing phase: 

	1. The browser checks to see if the element's outer-most ancestor (`<html>`) has an `onclick` event handler registered on it for the capturing phase, and runs it if so.
	2. Then it moves on to the next element inside `<html>` and does the same thing, then the next one, and so on until it reaches the element that was actually selected.

- In the bubbling phase, the exact opposite occurs:  

	1. The browser checks to see if the element selected has an `onclick` event handler registered on it for the bubbling phase, and runs it if so.
	2. Then it moves on to the next immediate ancestor element and does the same thing, then the next one, and so on until it reaches the `<html>` element.

- In modern browsers, by default, **all event handlers are registered for the bubbling phase**.

- Note: In cases where both types of event handlers are present, bubbling and capturing, the capturing phase will run first, followed by the bubbling phase.

## Fixing Event Bubbling and Capture problem with `stopPropagation()`

- the standard `Event` object has a function available on it called `stopPropagation()` which, when invoked on a handler's event object, makes it so that first handler is run but the event doesn't bubble any further up the chain, so no more handlers will be run.

## Notes

- Why bother with both capturing and bubbling? Well, in the bad old days when browsers were much less cross-compatible than they are now, Netscape only used event capturing, and Internet Explorer used only event bubbling. When the W3C decided to try to standardize the behavior and reach a consensus, they ended up with this system that included both, which is the one modern browsers implemented.

- As mentioned above, by default all event handlers are registered in the bubbling phase, and this makes more sense most of the time. If you really want to register an event in the capturing phase instead, you can do so by registering your handler using `addEventListener()`, and setting the optional third property to `true`.

##  Event Delegation

- Bubbling also allows us to take advantage of event delegation — this concept relies on the fact that if you want some code to run when you select any one of a large number of child elements, you can set the event listener on their parent and have events that happen on them bubble up to their parent rather than having to set the event listener on every child individually.