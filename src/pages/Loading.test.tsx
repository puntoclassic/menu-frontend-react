import Loading from 'pages/Loading';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'redux/store';
import { render, screen } from '@testing-library/react';

it('il componente contiene la scritta Loading...', () => {

    render(
        <Provider store={store}>
            <BrowserRouter>
                <Loading></Loading>
            </BrowserRouter>
        </Provider>,
    );

    expect(screen.getByText("Loading...")).toBeTruthy();
});

