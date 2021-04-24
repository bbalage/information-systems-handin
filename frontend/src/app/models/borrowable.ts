export interface Borrowable {
    serialNumber: number;
    title: string;
    author: string;
    maxBorrowTime: number;
    /**
     * CD:          'c';
     * Book:        'b';
     * Music sheet: 'm';
     */
    type: string;
    acquirementDate: Date;
    /**
     * Borrowed:  'b';
     * Free:      'f';
     * Discarded: 'd';
     */
     status: string;

}