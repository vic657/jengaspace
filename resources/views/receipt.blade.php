<!DOCTYPE html>
<html>
<head>
    <title>Payment Receipt</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; }
        .header { text-align: center; }
        .details { margin: 20px 0; }
        .section-title { font-size: 16px; margin-top: 30px; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .footer { margin-top: 40px; font-size: 12px; text-align: center; color: #888; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Payment Receipt</h2>
        <p>JengaSpace Housing</p>
    </div>

    <div class="details">
        <div class="section-title">Tenant Details</div>
        <p><strong>Name:</strong> {{ $user->name }}</p>
        <p><strong>Email:</strong> {{ $user->email }}</p>

        <div class="section-title">Listing Information</div>
        <p><strong>Category:</strong> {{ $listing->category }}</p>
        <p><strong>Location:</strong> {{ $listing->location }}</p>
        <p><strong>Rent:</strong> KES {{ $payment->rent_amount }}</p>
        <p><strong>Total Paid:</strong> KES {{ $payment->total_amount }}</p>
        <p><strong>Status:</strong> {{ ucfirst($payment->status) }}</p>
        <p><strong>Date:</strong> {{ now()->format('d M Y, h:i A') }}</p>

        <div class="section-title">Landlord Details</div>
        <p><strong>Name:</strong> {{ $landlord->name }}</p>
        <p><strong>Email:</strong> {{ $landlord->email }}</p>
        <p><strong>Phone:</strong> {{ $landlord->phone ?? 'N/A' }}</p>
    </div>

    <div class="footer">
        <p>Thanks for choosing JengaSpace!</p>
    </div>
</body>
</html>
