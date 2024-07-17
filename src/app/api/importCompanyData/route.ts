import { NextResponse, NextRequest } from 'next/server'
import * as csv from 'fast-csv';
import fs from 'fs';

type CSVROW = {
    uen: string;
    issuance_agency_id: string
    uen_status: string
    entity_name: string
    entity_type: string
    uen_issue_date: string
    reg_street_name: string
    reg_postal_code: string
}
export async function POST(req: NextRequest) {
    const path = process.cwd() + '/src/app/api/importCompanyData/_testData/EntitiesRegisteredwithACRA.csv';
    await fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on('error', (error: Error) => console.error(error))
        .on('data', async (row: CSVROW) => {

        })
        .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));;

}