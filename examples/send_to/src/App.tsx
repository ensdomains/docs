import { Card, Button, Profile, Input, Typography } from '@ensdomains/thorin';
import { Navbar } from './Navbar';

// Import thorin css
import "@ensdomains/thorin/style.css";

// Create component
export const App = () => {

    return (
        <div className="p-4 bg-ens-grey1 min-h-screen">
            <Navbar />
            <div className="w-full max-w-screen-lg mx-auto">
                <Card>
                    {/* <Profile address='0x225f137127d9067788314bc7fcc1f36746a3c3B5' /> */}
                    <Typography fontVariant='headingOne'>
                        Heading One
                    </Typography>
                    <Input label={'Input'} />
                    <Button>Button</Button>
                </Card>
            </div>
        </div>
    )
}
