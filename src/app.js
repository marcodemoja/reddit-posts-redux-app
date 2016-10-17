import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './Containers/Root'


const appContainer = document.createElement('div')
appContainer.setAttribute('id', 'root')
document.body.appendChild(appContainer)

render(
    <Root />,
    document.getElementById('root')
)
