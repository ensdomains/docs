import { Button } from '@/components/Button';
import { Col } from '@/components/mdx/Col';
import { EmbedLink } from '@/components/mdx/EmbedLink';
import { h2, h3, h4 } from '@/components/mdx/heading/h2';
import { Note } from '@/components/mdx/Note';
import { Properties } from '@/components/mdx/Properties';
import { Property } from '@/components/mdx/Property';
import { Row } from '@/components/mdx/Row';

import { Code, Pre } from './code/Code';
import { CodeGroup } from './code/group/CodeGroup';
import { ALink } from './link/ALink';
import { Repository } from './repository/Repository';
import { VideoComponent } from './video/Video';

export const prose = {
    a: ALink,
    h2,
    h3,
    h4,
    Note,
    Row,
    Col,
    Properties,
    Property,
    code: Code,
    CodeGroup,
    pre: Pre,
    button: Button,
    Button,
    VideoComponent,
    EmbedLink,
    Repository,
};
