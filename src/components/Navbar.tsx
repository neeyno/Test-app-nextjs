import Link from "next/link"
import { useRouter } from "next/router"

import styled from "styled-components"

function Navbar() {
    const router = useRouter()

    const links = [
        {
            id: 0,
            path: "/",
            text: "Converter",
        },
        {
            id: 1,
            path: "/watchlist",
            text: "Watchlist",
        },
    ]

    return (
        <NavBar>
            <NavContainer as="div">
                <div>
                    <h2>Test App</h2>
                </div>

                {links.map((link) => (
                    <Link href={link.path} key={link.id}>
                        <nav
                            style={{
                                outline:
                                    router.asPath == link.path
                                        ? "2px solid #f1f5f9"
                                        : "none",
                            }}
                        >
                            {link.text}
                        </nav>
                    </Link>
                ))}
            </NavContainer>
        </NavBar>
    )
}

const NavBar = styled.header`
    display: flex;
    justify-content: center;

    padding: 1.5rem;
    background: #64748b;

    color: #f1f5f9;

    @media (max-width: 768px) {
        padding: 1.2rem;
    }

    box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
`
const NavContainer = styled.div`
    display: flex;
    justify-content: center;

    padding: 0;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;

    letter-spacing: 1.25px;

    align-items: center;

    > div {
        h2 {
            font-size: 1.8rem;
            font-weight: bold;
            margin: auto;
        }
    }
    > a {
        color: #f1f5f9;
        text-decoration: none;
        > nav {
            font-size: 1.2rem;
            font-weight: normal;

            margin: 1rem 2rem;

            outline-offset: 8px;
            border-radius: 1px;

            @media (max-width: 768px) {
                &:first-child {
                    margin-left: 1rem;
                }
                &:last-child {
                    margin-left: 1rem;
                }
            }
        }
    }
`

export default Navbar
