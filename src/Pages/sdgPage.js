import React, { useState } from 'react';
import styled from 'styled-components';
import sdg1 from '../assets/1.png';
import sdg2 from '../assets/2.png';
import sdg3 from '../assets/3.png';
import sdg4 from '../assets/4.png';
import sdg5 from '../assets/5.png';
import sdg6 from '../assets/6.png';
import sdg7 from '../assets/7.png';
import sdg8 from '../assets/8.png';
import sdg9 from '../assets/9.png';
import sdg10 from '../assets/10.png';
import sdg11 from '../assets/11.png';
import sdg12 from '../assets/12.png';
import sdg13 from '../assets/13.png';
import sdg14 from '../assets/14.png';
import sdg15 from '../assets/15.png';
import sdg16 from '../assets/16.png';
import sdg17 from '../assets/17.png';
import data from '../SeconData/dlink.json';
import SearchBar from '../components/SearchBar';

const sdgImages = [sdg1, sdg2, sdg3, sdg4, sdg5, sdg6, sdg7, sdg8, sdg9, sdg10, sdg11, sdg12, sdg13, sdg14, sdg15, sdg16, sdg17];

const SDGPage = () => {
    const [selectedSDG, setSelectedSDG] = useState(null);

    const handleSDGClick = (sdgNumber) => {
        const sdgDetails = data[sdgNumber];
        setSelectedSDG(sdgDetails);
    };

    return (
        <Container>
            <HeaderContainer>
                <Header>Sustainable Development Goals</Header>
                <SearchContainer>
                    <SearchBar />
                </SearchContainer>
            </HeaderContainer>
            <ContentRow>
                <ImageContainerBox>
                    <SubHeader>Select an SDG</SubHeader>
                    <ImageGrid>
                        {sdgImages.map((image, index) => (
                            <ImageWrapper key={index}>
                                <Image
                                    src={image}
                                    alt={`SDG ${index + 1}`}
                                    onClick={() => handleSDGClick(index + 1)}
                                />
                            </ImageWrapper>
                        ))}
                    </ImageGrid>
                </ImageContainerBox>
                <DetailsContainer>
                    {selectedSDG ? (
                        <DetailsContent>
                            <SubHeader>SDG {selectedSDG.SDG} Details</SubHeader>
                            <TableContainer>
                                <Table>
                                    <thead>
                                        <tr>
                                            <TableHeader>Indicator</TableHeader>
                                            <TableHeader>Description</TableHeader>
                                            <TableHeader>Source</TableHeader>
                                            <TableHeader>Learn More</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedSDG.Indicators.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.Indicator}</TableCell>
                                                <TableCell>{item.Description}</TableCell>
                                                <TableCell>{item.Source}</TableCell>
                                                <TableCell><a href={item.Dwldlink} target="_blank" rel="noopener noreferrer">Learn More</a></TableCell>
                                            </TableRow>
                                        ))}
                                    </tbody>
                                </Table>
                            </TableContainer>
                        </DetailsContent>
                    ) : (
                        <Placeholder>
                            <h3>Select an SDG to view details</h3>
                        </Placeholder>
                    )}
                </DetailsContainer>
            </ContentRow>
        </Container>
    );
};

const Container = styled.div`
    font-family: Arial, sans-serif;
    padding: 20px;
    margin: 0 auto;
    background-color: #f9f9f9;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    flex-wrap: wrap;
`;

const Header = styled.h1`
    color: #007bff;
    margin: 0;
`;

const SearchContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;

    @media (max-width: 768px) {
        position: relative;
        margin-top: 20px;
        width: 100%;
        text-align: center;
    }
`;

const ContentRow = styled.div`
    display: flex;
    flex-direction: row;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const ImageContainerBox = styled.div`
    width: 30%;
    border-right: 1px solid #ddd;
    padding-right: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-right: 20px;

    @media (max-width: 768px) {
        width: 100%;
        margin-right: 0;
        margin-bottom: 20px;
    }
`;

const SubHeader = styled.h2`
    color: #007bff;
    text-align: center;
    margin-bottom: 20px;
`;

const ImageGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ImageWrapper = styled.div`
    margin: 10px;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
    }

    @media (max-width: 480px) {
        width: 60px;
        height: 60px;
    }
`;

const Image = styled.img`
    cursor: pointer;
    width: 100%;
    height: 100%;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.1);
    }
`;

const DetailsContainer = styled.div`
    width: 70%;
    padding-left: 20px;

    @media (max-width: 768px) {
        width: 100%;
        padding-left: 0;
    }
`;

const DetailsContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableContainer = styled.div`
    overflow-x: auto; /* Allows horizontal scrolling on small screens */
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    min-width: 600px; /* Ensures table has a minimum width */
`;

const TableHeader = styled.th`
    background-color: #007bff;
    color: white;
    border: 1px solid #ddd;
    padding: 8px;
`;

const TableCell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const Placeholder = styled.div`
    text-align: center;
    padding: 10px;
    color: #777;
`;

export default SDGPage;
